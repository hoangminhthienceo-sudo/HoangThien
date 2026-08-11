/**
 * Lớp ghi dữ liệu lên WordPress cho trang Admin (#admin).
 *
 * Xác thực bằng Application Password của WordPress (WP Admin > Người dùng >
 * Hồ sơ > Application Passwords). Thông tin đăng nhập chỉ nằm trong
 * sessionStorage — đóng tab là mất, không lưu vĩnh viễn trên máy.
 *
 * LƯU Ý BẢO MẬT: đây là SPA thuần nên mọi lời gọi API đều chạy từ trình duyệt.
 * Chỉ đăng nhập trên máy tin cậy và luôn dùng HTTPS cho domain WordPress.
 */
import { isWordPressEnabled, wpFetch } from './wordpress';
import { SiteSettings } from '../data/siteSettings';

const SESSION_KEY = 'hmt_wp_credentials';

export interface WPCredentials {
  username: string;
  /** Application Password do WordPress sinh ra (dạng "abcd EFGH ijkl ...") */
  appPassword: string;
}

/**
 * Quyền của người đăng nhập, suy ra từ capabilities của WordPress.
 *
 * QUAN TRỌNG: đây chỉ dùng để ẩn/hiện giao diện cho gọn. Việc chặn thật nằm ở
 * WordPress — REST API tự từ chối mọi thao tác vượt quyền, kể cả khi có ai đó
 * sửa giao diện trong trình duyệt.
 */
export interface WPPermissions {
  /** Sửa được nội dung chữ & link của website (chỉ Quản trị viên) */
  canEditSiteContent: boolean;
  /** Viết và sửa bài */
  canWritePosts: boolean;
  /** Tự đăng bài công khai (Cộng tác viên không có quyền này) */
  canPublish: boolean;
  /** Tải ảnh lên thư viện */
  canUploadFiles: boolean;
  /** Xoá bài của người khác */
  canDeleteOthersPosts: boolean;
}

export type WPRoleLabel = 'Quản trị viên' | 'Nhân viên' | 'Không đủ quyền';

export interface WPUser {
  id: number;
  name: string;
  capabilities: string[];
  permissions: WPPermissions;
  roleLabel: WPRoleLabel;
}

const derivePermissions = (capabilities: string[]): WPPermissions => {
  const has = (cap: string) => capabilities.includes(cap);
  return {
    canEditSiteContent: has('manage_options'),
    canWritePosts: has('edit_posts'),
    canPublish: has('publish_posts'),
    canUploadFiles: has('upload_files'),
    canDeleteOthersPosts: has('delete_others_posts'),
  };
};

const deriveRoleLabel = (permissions: WPPermissions): WPRoleLabel => {
  if (permissions.canEditSiteContent) return 'Quản trị viên';
  if (permissions.canWritePosts) return 'Nhân viên';
  return 'Không đủ quyền';
};

// ---------------------------------------------------------------------------
// Quản lý phiên đăng nhập
// ---------------------------------------------------------------------------

export const loadCredentials = (): WPCredentials | null => {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as WPCredentials) : null;
  } catch {
    return null;
  }
};

export const saveCredentials = (credentials: WPCredentials): void => {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(credentials));
};

export const clearCredentials = (): void => {
  sessionStorage.removeItem(SESSION_KEY);
};

const authHeader = (credentials: WPCredentials): string => {
  // Application Password của WP hiển thị có khoảng trắng cho dễ đọc, khi dùng thì bỏ đi
  const token = `${credentials.username}:${credentials.appPassword.replace(/\s+/g, '')}`;
  // btoa chỉ nhận latin1 nên phải mã hoá UTF-8 trước
  const utf8 = new TextEncoder().encode(token);
  return `Basic ${btoa(String.fromCharCode(...utf8))}`;
};

// ---------------------------------------------------------------------------
// Gọi API có xác thực
// ---------------------------------------------------------------------------

class WordPressError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = 'WordPressError';
  }
}

const friendlyError = (status: number, fallback: string): string => {
  if (status === 401) return 'Sai tên đăng nhập hoặc Application Password.';
  if (status === 403) return 'Tài khoản này không có quyền thực hiện thao tác.';
  if (status === 404) return 'Không tìm thấy endpoint. Kiểm tra lại đoạn PHP trong WORDPRESS.md đã thêm chưa.';
  return fallback;
};

async function authedRequest<T>(
  credentials: WPCredentials,
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const response = await wpFetch(path, {
    ...init,
    headers: {
      Accept: 'application/json',
      Authorization: authHeader(credentials),
      ...(init.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...init.headers,
    },
  });

  if (!response.ok) {
    let detail = `${response.status} ${response.statusText}`;
    try {
      const body = await response.json();
      if (body?.message) detail = String(body.message);
    } catch {
      /* body không phải JSON — giữ nguyên detail */
    }
    throw new WordPressError(friendlyError(response.status, detail), response.status);
  }

  return (await response.json()) as T;
}

// ---------------------------------------------------------------------------
// Đăng nhập
// ---------------------------------------------------------------------------

/** Kiểm tra thông tin đăng nhập, trả về user nếu hợp lệ */
export const verifyCredentials = async (credentials: WPCredentials): Promise<WPUser> => {
  if (!isWordPressEnabled()) {
    throw new Error('Chưa cấu hình VITE_WP_API_URL trong file .env');
  }
  const user = await authedRequest<{ id: number; name: string; capabilities?: Record<string, boolean> }>(
    credentials,
    '/wp/v2/users/me?context=edit'
  );

  const capabilities = Object.keys(user.capabilities ?? {}).filter((c) => user.capabilities?.[c]);
  const permissions = derivePermissions(capabilities);

  if (!permissions.canWritePosts && !permissions.canEditSiteContent) {
    throw new Error(
      'Tài khoản này không có quyền viết bài. Nhờ quản trị viên đổi vai trò sang Tác giả hoặc cao hơn.'
    );
  }

  return {
    id: user.id,
    name: user.name,
    capabilities,
    permissions,
    roleLabel: deriveRoleLabel(permissions),
  };
};

// ---------------------------------------------------------------------------
// Cài đặt site (nội dung chữ & link của các trang)
// ---------------------------------------------------------------------------

const SETTINGS_PATH = '/hmt/v1/settings';

/** Đọc cài đặt công khai — không cần đăng nhập, dùng cho site cho khách xem */
export const fetchSiteSettings = async (signal?: AbortSignal): Promise<Partial<SiteSettings> | null> => {
  if (!isWordPressEnabled()) return null;
  const response = await wpFetch(SETTINGS_PATH, {
    signal,
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    // 404 = chưa thêm đoạn PHP, coi như chưa có cài đặt tuỳ chỉnh
    if (response.status === 404) return null;
    throw new Error(`Không đọc được cài đặt: ${response.status}`);
  }
  const data = await response.json();
  return data && typeof data === 'object' && Object.keys(data).length > 0 ? data : null;
};

/** Lưu cài đặt lên WordPress — cần quyền quản trị */
export const saveSiteSettings = async (
  credentials: WPCredentials,
  settings: SiteSettings
): Promise<void> => {
  await authedRequest(credentials, SETTINGS_PATH, {
    method: 'POST',
    body: JSON.stringify(settings),
  });
};

// ---------------------------------------------------------------------------
// Bài viết
// ---------------------------------------------------------------------------

export interface AdminPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  status: 'publish' | 'draft' | 'pending' | 'private' | 'future';
  date: string;
  link: string;
  categories: number[];
  tags: number[];
  featuredMediaId: number;
  featuredMediaUrl: string | null;
}

interface WPRawPost {
  id: number;
  date: string;
  link: string;
  status: AdminPost['status'];
  title: { raw?: string; rendered: string };
  content: { raw?: string; rendered: string };
  excerpt: { raw?: string; rendered: string };
  categories: number[];
  tags: number[];
  featured_media: number;
  _embedded?: { 'wp:featuredmedia'?: { source_url?: string }[] };
}

const toAdminPost = (post: WPRawPost): AdminPost => ({
  id: post.id,
  title: post.title.raw ?? post.title.rendered,
  content: post.content.raw ?? post.content.rendered,
  excerpt: post.excerpt.raw ?? post.excerpt.rendered,
  status: post.status,
  date: post.date,
  link: post.link,
  categories: post.categories ?? [],
  tags: post.tags ?? [],
  featuredMediaId: post.featured_media ?? 0,
  featuredMediaUrl: post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null,
});

export const listPosts = async (
  credentials: WPCredentials,
  perPage = 50
): Promise<AdminPost[]> => {
  const posts = await authedRequest<WPRawPost[]>(
    credentials,
    `/wp/v2/posts?context=edit&status=any&per_page=${perPage}&_embed=wp:featuredmedia&orderby=date&order=desc`
  );
  return posts.map(toAdminPost);
};

export interface PostPayload {
  title: string;
  content: string;
  excerpt: string;
  status: AdminPost['status'];
  categories: number[];
  tags: number[];
  featured_media?: number;
}

export const createPost = async (
  credentials: WPCredentials,
  payload: PostPayload
): Promise<AdminPost> => {
  const post = await authedRequest<WPRawPost>(credentials, '/wp/v2/posts?context=edit&_embed=wp:featuredmedia', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return toAdminPost(post);
};

export const updatePost = async (
  credentials: WPCredentials,
  id: number,
  payload: PostPayload
): Promise<AdminPost> => {
  const post = await authedRequest<WPRawPost>(
    credentials,
    `/wp/v2/posts/${id}?context=edit&_embed=wp:featuredmedia`,
    { method: 'POST', body: JSON.stringify(payload) }
  );
  return toAdminPost(post);
};

/** Chuyển bài vào thùng rác (không xoá vĩnh viễn) */
export const trashPost = async (credentials: WPCredentials, id: number): Promise<void> => {
  await authedRequest(credentials, `/wp/v2/posts/${id}`, { method: 'DELETE' });
};

// ---------------------------------------------------------------------------
// Danh mục, thẻ, ảnh
// ---------------------------------------------------------------------------

export interface WPTermSummary {
  id: number;
  name: string;
  slug: string;
  count: number;
}

const listTerms = async (
  credentials: WPCredentials,
  taxonomy: 'categories' | 'tags'
): Promise<WPTermSummary[]> =>
  authedRequest<WPTermSummary[]>(
    credentials,
    `/wp/v2/${taxonomy}?per_page=100&orderby=count&order=desc`
  );

export const listCategories = (credentials: WPCredentials) => listTerms(credentials, 'categories');
export const listTags = (credentials: WPCredentials) => listTerms(credentials, 'tags');

/** Tạo thẻ mới trực tiếp từ trang Admin */
export const createTag = async (
  credentials: WPCredentials,
  name: string
): Promise<WPTermSummary> =>
  authedRequest<WPTermSummary>(credentials, '/wp/v2/tags', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });

export interface UploadedMedia {
  id: number;
  url: string;
}

/** Tải ảnh lên Thư viện WordPress, dùng làm ảnh đại diện bài viết */
export const uploadMedia = async (
  credentials: WPCredentials,
  file: File
): Promise<UploadedMedia> => {
  const form = new FormData();
  form.append('file', file, file.name);

  const media = await authedRequest<{ id: number; source_url: string }>(
    credentials,
    '/wp/v2/media',
    { method: 'POST', body: form }
  );

  return { id: media.id, url: media.source_url };
};
