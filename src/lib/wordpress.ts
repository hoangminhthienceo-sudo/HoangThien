/**
 * Lớp kết nối Headless WordPress.
 *
 * Site React này là giao diện; WordPress chỉ là nơi soạn bài. Bài viết, danh mục
 * và ĐẶC BIỆT là THẺ (tags) được quản lý hoàn toàn trong WP Admin rồi kéo về đây
 * qua REST API công khai (/wp-json/wp/v2/...).
 *
 * Nếu chưa cấu hình VITE_WP_API_URL, toàn site tự động chạy bằng dữ liệu tĩnh
 * trong src/data/ — không có gì vỡ. Xem hướng dẫn cài đặt tại WORDPRESS.md.
 */
import { Course, PostTag, ProjectReview } from '../types';
import { verdictColorFor, normalizeVerdict } from '../data/projectsData';

const FALLBACK_THUMBNAIL =
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80';

/** Domain WordPress, ví dụ: https://cms.hoangminhthien.com */
export const WP_BASE_URL: string = (import.meta.env.VITE_WP_API_URL ?? '').replace(/\/+$/, '');

/** Slug danh mục WP dùng để phân loại bài thành Khoá Học / Review Dự Án */
export const WP_COURSES_CATEGORY: string = import.meta.env.VITE_WP_COURSES_CATEGORY ?? 'khoa-hoc';
export const WP_PROJECTS_CATEGORY: string = import.meta.env.VITE_WP_PROJECTS_CATEGORY ?? 'review-du-an';

/** Bật WordPress hay chưa. False => site dùng dữ liệu tĩnh trong src/data/ */
export const isWordPressEnabled = (): boolean => WP_BASE_URL.length > 0;

// ---------------------------------------------------------------------------
// Kiểu dữ liệu thô trả về từ WP REST API
// ---------------------------------------------------------------------------

interface WPRendered {
  rendered: string;
}

interface WPTerm {
  id: number;
  slug: string;
  name: string;
  taxonomy: 'category' | 'post_tag' | string;
}

interface WPPost {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: WPRendered;
  excerpt: WPRendered;
  content: WPRendered;
  categories: number[];
  tags: number[];
  meta?: Record<string, unknown>;
  _embedded?: {
    author?: { name?: string }[];
    'wp:featuredmedia'?: { source_url?: string }[];
    'wp:term'?: WPTerm[][];
  };
}

// ---------------------------------------------------------------------------
// Tiện ích chuyển đổi
// ---------------------------------------------------------------------------

/** Gỡ thẻ HTML và giải mã entity từ chuỗi WP trả về (title/excerpt đã render sẵn) */
const stripHtml = (html: string): string => {
  const el = document.createElement('div');
  el.innerHTML = html;
  return (el.textContent ?? '').replace(/\s+/g, ' ').trim();
};

/** 2025-12-26T08:30:00 -> 26/12/2025 */
const formatDate = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
};

/** Lấy danh sách <li> trong nội dung bài — dùng cho giáo trình / điểm nổi bật */
const extractListItems = (html: string, limit = 8): string[] => {
  const el = document.createElement('div');
  el.innerHTML = html;
  return Array.from(el.querySelectorAll('li'))
    .map((li) => (li.textContent ?? '').trim())
    .filter(Boolean)
    .slice(0, limit);
};

const meta = (post: WPPost, key: string): string | undefined => {
  const value = post.meta?.[key];
  if (value === undefined || value === null || value === '') return undefined;
  return String(value);
};

const metaNumber = (post: WPPost, key: string): number | undefined => {
  const raw = meta(post, key);
  if (raw === undefined) return undefined;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const metaList = (post: WPPost, key: string): string[] | undefined => {
  const value = post.meta?.[key];
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  const raw = meta(post, key);
  if (!raw) return undefined;
  return raw.split(/\r?\n|\|/).map((s) => s.trim()).filter(Boolean);
};

const embeddedTerms = (post: WPPost, taxonomy: WPTerm['taxonomy']): WPTerm[] =>
  (post._embedded?.['wp:term'] ?? []).flat().filter((term) => term?.taxonomy === taxonomy);

/** Thẻ của bài — trái tim của chức năng gắn thẻ qua WordPress */
const postTags = (post: WPPost): PostTag[] =>
  embeddedTerms(post, 'post_tag').map(({ id, slug, name }) => ({ id, slug, name }));

/** Danh mục hiển thị: bỏ qua 2 danh mục gốc dùng để phân loại Khoá Học / Review */
const displayCategory = (post: WPPost): { slug: string; label: string } => {
  const categories = embeddedTerms(post, 'category');
  const specific = categories.find(
    (c) => c.slug !== WP_COURSES_CATEGORY && c.slug !== WP_PROJECTS_CATEGORY
  );
  const chosen = specific ?? categories[0];
  return chosen ? { slug: chosen.slug, label: chosen.name } : { slug: 'tong-hop', label: 'Tổng hợp' };
};

const featuredImage = (post: WPPost): string =>
  post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? FALLBACK_THUMBNAIL;

const authorName = (post: WPPost): string =>
  post._embedded?.author?.[0]?.name ?? 'Hoàng Minh Thiên';

const isCourseLevel = (value: string | undefined): value is Course['level'] =>
  value === 'Người mới' || value === 'Trung cấp' || value === 'Chuyên sâu';

// ---------------------------------------------------------------------------
// Mapper: WP Post -> model của site
// ---------------------------------------------------------------------------

export const mapPostToCourse = (post: WPPost): Course => {
  const category = displayCategory(post);
  const tags = postTags(post);
  const curriculum = metaList(post, 'curriculum') ?? extractListItems(post.content?.rendered ?? '');
  const level = meta(post, 'level');

  return {
    id: `wp-course-${post.id}`,
    slug: post.slug,
    title: stripHtml(post.title.rendered),
    category: category.slug,
    categoryLabel: category.label,
    thumbnail: featuredImage(post),
    badge: (meta(post, 'badge') ?? tags[0]?.name ?? category.label).toUpperCase(),
    date: formatDate(post.date),
    level: isCourseLevel(level) ? level : 'Người mới',
    lessonsCount: metaNumber(post, 'lessons_count') ?? curriculum.length,
    duration: meta(post, 'duration') ?? '—',
    description: stripHtml(post.excerpt?.rendered ?? ''),
    instructor: meta(post, 'instructor') ?? authorName(post),
    rating: metaNumber(post, 'rating') ?? 5,
    studentsCount: metaNumber(post, 'students_count') ?? 0,
    curriculum,
    content: post.content?.rendered ?? '',
    tags,
    sourceUrl: post.link,
  };
};

export const mapPostToProject = (post: WPPost): ProjectReview => {
  const category = displayCategory(post);
  const verdict = normalizeVerdict(meta(post, 'verdict'));
  const listItems = extractListItems(post.content?.rendered ?? '');

  return {
    id: `wp-project-${post.id}`,
    slug: post.slug,
    title: stripHtml(post.title.rendered),
    category: category.slug,
    categoryLabel: category.label,
    thumbnail: featuredImage(post),
    verdict,
    verdictColor: verdictColorFor(verdict),
    riskReward: meta(post, 'risk_reward') ?? 'Đang cập nhật',
    rating: metaNumber(post, 'rating') ?? 5,
    date: formatDate(post.date),
    summary: stripHtml(post.excerpt?.rendered ?? ''),
    tokenomics: meta(post, 'tokenomics'),
    highlights: metaList(post, 'highlights') ?? listItems,
    risks: metaList(post, 'risks') ?? [],
    onChainMetrics: meta(post, 'onchain_metrics'),
    author: meta(post, 'author_name') ?? authorName(post),
    content: post.content?.rendered ?? '',
    tags: postTags(post),
    sourceUrl: post.link,
  };
};

// ---------------------------------------------------------------------------
// Gọi API
// ---------------------------------------------------------------------------

/**
 * WordPress phục vụ REST API theo 2 kiểu địa chỉ:
 *   - "pretty": /wp-json/wp/v2/posts       (khi permalink KHÔNG ở chế độ Plain)
 *   - "query" : /?rest_route=/wp/v2/posts  (luôn chạy, kể cả permalink Plain)
 *
 * Nhiều site để permalink Plain hoặc Apache đặt AllowOverride None khiến kiểu
 * "pretty" trả 404. Ta thử "pretty" trước, hỏng thì tự chuyển sang "query" và
 * nhớ lại để các lần sau khỏi thử lại.
 */
type RouteStyle = 'pretty' | 'query';

let resolvedRouteStyle: RouteStyle | null = null;

/** routePath dạng '/wp/v2/posts?per_page=10' (không kèm tiền tố /wp-json) */
export const buildRestUrl = (routePath: string, style: RouteStyle): string => {
  if (style === 'pretty') {
    return `${WP_BASE_URL}/wp-json${routePath}`;
  }
  const [route, query] = routePath.split('?');
  const extra = query ? `&${query}` : '';
  return `${WP_BASE_URL}/?rest_route=${encodeURIComponent(route)}${extra}`;
};

/** Phản hồi hợp lệ = có JSON. WordPress trả HTML 404 của Apache khi sai kiểu địa chỉ. */
const looksLikeJson = (response: Response): boolean =>
  (response.headers.get('content-type') ?? '').includes('json');

/**
 * Gọi REST API WordPress, tự chọn kiểu địa chỉ chạy được.
 * Dùng chung cho cả phần đọc công khai lẫn phần ghi ở trang Admin.
 */
export const wpFetch = async (routePath: string, init: RequestInit = {}): Promise<Response> => {
  const order: RouteStyle[] = resolvedRouteStyle
    ? [resolvedRouteStyle]
    : ['pretty', 'query'];

  let lastResponse: Response | null = null;

  for (const style of order) {
    const response = await fetch(buildRestUrl(routePath, style), init);

    // Chỉ coi là "sai kiểu địa chỉ" khi 404 mà nội dung không phải JSON
    const wrongStyle = response.status === 404 && !looksLikeJson(response);
    if (!wrongStyle) {
      resolvedRouteStyle = style;
      return response;
    }
    lastResponse = response;
  }

  return lastResponse as Response;
};

const request = async <T>(path: string, signal?: AbortSignal): Promise<T> => {
  const response = await wpFetch(`/wp/v2${path}`, {
    signal,
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`WordPress API ${response.status}: ${path}`);
  }
  return (await response.json()) as T;
};

/** Lấy id của một danh mục theo slug (WP REST lọc bài theo id, không theo slug) */
const categoryIdBySlug = async (slug: string, signal?: AbortSignal): Promise<number | null> => {
  const categories = await request<{ id: number }[]>(
    `/categories?slug=${encodeURIComponent(slug)}&per_page=1`,
    signal
  );
  return categories[0]?.id ?? null;
};

const fetchPostsByCategorySlug = async (
  slug: string,
  signal?: AbortSignal,
  perPage = 50
): Promise<WPPost[]> => {
  const categoryId = await categoryIdBySlug(slug, signal);
  if (categoryId === null) {
    throw new Error(
      `Không tìm thấy danh mục "${slug}" trên WordPress. Hãy tạo danh mục này trong WP Admin > Bài viết > Danh mục.`
    );
  }
  return request<WPPost[]>(
    `/posts?categories=${categoryId}&per_page=${perPage}&_embed=author,wp:featuredmedia,wp:term&orderby=date&order=desc`,
    signal
  );
};

export const fetchCourses = async (signal?: AbortSignal): Promise<Course[]> => {
  const posts = await fetchPostsByCategorySlug(WP_COURSES_CATEGORY, signal);
  return posts.map(mapPostToCourse);
};

export const fetchProjects = async (signal?: AbortSignal): Promise<ProjectReview[]> => {
  const posts = await fetchPostsByCategorySlug(WP_PROJECTS_CATEGORY, signal);
  return posts.map(mapPostToProject);
};

/** Gom toàn bộ thẻ xuất hiện trong một danh sách bài, kèm số bài mỗi thẻ */
export const collectTags = (
  items: { tags: PostTag[] }[]
): (PostTag & { count: number })[] => {
  const registry = new Map<string, PostTag & { count: number }>();
  items.forEach((item) => {
    item.tags.forEach((tag) => {
      const existing = registry.get(tag.slug);
      if (existing) {
        existing.count += 1;
      } else {
        registry.set(tag.slug, { ...tag, count: 1 });
      }
    });
  });
  return Array.from(registry.values()).sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name, 'vi')
  );
};
