import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  ImagePlus,
  Loader2,
  Plus,
  RefreshCw,
  Save,
  Tag as TagIcon,
  Trash2,
  X,
} from 'lucide-react';
import { RichTextEditor } from '../RichTextEditor';
import { TextAreaField, TextField } from './Fields';
import {
  AdminPost,
  PostPayload,
  WPCredentials,
  WPPermissions,
  WPTermSummary,
  createPost,
  createTag,
  listCategories,
  listPosts,
  listTags,
  trashPost,
  updatePost,
  uploadMedia,
} from '../../lib/wordpressAdmin';
import { WP_COURSES_CATEGORY, WP_PROJECTS_CATEGORY } from '../../lib/wordpress';

interface PostsTabProps {
  credentials: WPCredentials;
  permissions: WPPermissions;
}

interface DraftPost {
  id: number | null;
  title: string;
  content: string;
  excerpt: string;
  status: AdminPost['status'];
  categories: number[];
  tags: number[];
  featuredMediaId: number;
  featuredMediaUrl: string | null;
}

const EMPTY_DRAFT: DraftPost = {
  id: null,
  title: '',
  content: '',
  excerpt: '',
  // Mặc định đăng luôn: viết bài mới là để nó hiện ra ngoài site.
  // Muốn giữ nháp thì đổi ở ô trạng thái ngay cạnh nút Lưu.
  status: 'publish',
  categories: [],
  tags: [],
  featuredMediaId: 0,
  featuredMediaUrl: null,
};

const STATUS_LABELS: Record<AdminPost['status'], string> = {
  publish: 'Đã đăng',
  draft: 'Bản nháp',
  pending: 'Chờ duyệt',
  private: 'Riêng tư',
  future: 'Hẹn giờ',
};

/**
 * Bài chỉ hiện ngoài site khi vừa ĐÃ ĐĂNG vừa thuộc 1 trong 2 danh mục gốc.
 * Thiếu một trong hai là bài nằm im trong WordPress — đây là chỗ dễ nhầm nhất
 * nên báo thẳng ra sau khi lưu.
 */
const describeVisibility = (
  draft: DraftPost,
  roots: { courses?: WPTermSummary; projects?: WPTermSummary }
): string => {
  const page =
    roots.courses && draft.categories.includes(roots.courses.id)
      ? 'trang Khoá Học'
      : roots.projects && draft.categories.includes(roots.projects.id)
        ? 'trang Review Dự Án'
        : null;

  if (draft.status === 'pending') {
    return 'Đã gửi bài lên WordPress và đang chờ quản trị viên duyệt. Bài sẽ hiện ngoài site sau khi được duyệt.';
  }
  if (draft.status !== 'publish') {
    return 'Đã lưu vào WordPress, nhưng bài đang ở trạng thái nháp nên chưa hiện ngoài site. Đổi ô trạng thái sang "Đăng công khai" rồi lưu lại.';
  }
  if (!page) {
    return 'Đã đăng, nhưng bài chưa thuộc danh mục Khoá Học hay Review Dự Án nên chưa hiện ngoài site. Tích một trong hai ở khung Danh mục rồi lưu lại.';
  }
  return `Đã đăng lên WordPress. Bài sẽ hiện ở ${page}.`;
};

const STATUS_STYLES: Record<AdminPost['status'], string> = {
  publish: 'bg-emerald-100 text-emerald-700',
  draft: 'bg-slate-100 text-slate-600',
  pending: 'bg-amber-100 text-amber-700',
  private: 'bg-purple-100 text-purple-700',
  future: 'bg-blue-100 text-blue-700',
};

export const PostsTab: React.FC<PostsTabProps> = ({ credentials, permissions }) => {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [categories, setCategories] = useState<WPTermSummary[]>([]);
  const [tags, setTags] = useState<WPTermSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cộng tác viên không tự đăng được, bài của họ phải chờ duyệt
  const defaultStatus: AdminPost['status'] = permissions.canPublish ? 'publish' : 'pending';

  const [draft, setDraft] = useState<DraftPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [notice, setNotice] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [postList, categoryList, tagList] = await Promise.all([
        listPosts(credentials),
        listCategories(credentials),
        listTags(credentials),
      ]);
      setPosts(postList);
      setCategories(categoryList);
      setTags(tagList);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không tải được dữ liệu từ WordPress');
    } finally {
      setLoading(false);
    }
  }, [credentials]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const patchDraft = (patch: Partial<DraftPost>) =>
    setDraft((current) => (current ? { ...current, ...patch } : current));

  const toggleTerm = (list: number[], id: number): number[] =>
    list.includes(id) ? list.filter((item) => item !== id) : [...list, id];

  const handleSave = async () => {
    if (!draft) return;
    if (!draft.title.trim()) {
      setNotice('Bài viết cần có tiêu đề trước khi lưu.');
      return;
    }

    setSaving(true);
    setNotice(null);
    try {
      const payload: PostPayload = {
        title: draft.title,
        content: draft.content,
        excerpt: draft.excerpt,
        status: draft.status,
        categories: draft.categories,
        tags: draft.tags,
        featured_media: draft.featuredMediaId,
      };

      const saved = draft.id
        ? await updatePost(credentials, draft.id, payload)
        : await createPost(credentials, payload);

      setPosts((current) => {
        const others = current.filter((post) => post.id !== saved.id);
        return [saved, ...others];
      });
      setDraft({ ...draft, id: saved.id, featuredMediaUrl: saved.featuredMediaUrl });
      setNotice(describeVisibility(draft, rootCategories));
    } catch (err) {
      setNotice(err instanceof Error ? err.message : 'Lưu thất bại');
    } finally {
      setSaving(false);
    }
  };

  const handleTrash = async (post: AdminPost) => {
    const confirmed = window.confirm(
      `Chuyển bài "${post.title}" vào thùng rác WordPress?\n\nBài vẫn khôi phục được trong WP Admin.`
    );
    if (!confirmed) return;

    try {
      await trashPost(credentials, post.id);
      setPosts((current) => current.filter((item) => item.id !== post.id));
      if (draft?.id === post.id) setDraft(null);
    } catch (err) {
      setNotice(err instanceof Error ? err.message : 'Không chuyển được vào thùng rác');
    }
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    setNotice(null);
    try {
      const media = await uploadMedia(credentials, file);
      patchDraft({ featuredMediaId: media.id, featuredMediaUrl: media.url });
    } catch (err) {
      setNotice(err instanceof Error ? err.message : 'Tải ảnh thất bại');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCreateTag = async () => {
    const name = newTagName.trim();
    if (!name || !draft) return;

    const existing = tags.find((tag) => tag.name.toLowerCase() === name.toLowerCase());
    if (existing) {
      patchDraft({ tags: toggleTerm(draft.tags, existing.id) });
      setNewTagName('');
      return;
    }

    try {
      const created = await createTag(credentials, name);
      setTags((current) => [...current, created]);
      patchDraft({ tags: [...draft.tags, created.id] });
      setNewTagName('');
    } catch (err) {
      setNotice(err instanceof Error ? err.message : 'Không tạo được thẻ');
    }
  };

  const sortedTags = useMemo(
    () => [...tags].sort((a, b) => a.name.localeCompare(b.name, 'vi')),
    [tags]
  );

  /** 2 danh mục gốc quyết định bài hiện ở trang nào ngoài site */
  const rootCategories = useMemo(
    () => ({
      courses: categories.find((c) => c.slug === WP_COURSES_CATEGORY),
      projects: categories.find((c) => c.slug === WP_PROJECTS_CATEGORY),
    }),
    [categories]
  );

  /** Bài sẽ hiện ở đâu ngoài site, hoặc null nếu chưa chọn danh mục gốc nào */
  const destination = useMemo(() => {
    if (!draft) return null;
    const { courses, projects } = rootCategories;
    if (courses && draft.categories.includes(courses.id)) return 'trang Khoá Học';
    if (projects && draft.categories.includes(projects.id)) return 'trang Review Dự Án';
    return null;
  }, [draft, rootCategories]);

  // -------------------------------------------------------------------------
  // Màn hình soạn bài
  // -------------------------------------------------------------------------
  if (draft) {
    return (
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setDraft(null)}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-[#2563EB] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Về danh sách bài viết
          </button>

          <div className="flex items-center gap-2">
            <select
              value={draft.status}
              onChange={(e) => patchDraft({ status: e.target.value as AdminPost['status'] })}
              className="px-3 py-2.5 bg-white border border-[#E0F2FE] rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#2563EB]"
            >
              <option value="draft">Bản nháp</option>
              {permissions.canPublish && <option value="publish">Đăng công khai</option>}
              <option value="pending">Chờ duyệt</option>
              {permissions.canPublish && <option value="private">Riêng tư</option>}
            </select>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-[#1D4ED8] disabled:opacity-60 transition-all"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? 'Đang lưu…' : 'Lưu lên WordPress'}
            </button>
          </div>
        </div>

        {notice && (
          <div className="px-4 py-3 rounded-xl bg-[#F0F7FF] border border-[#BFDBFE] text-sm text-slate-700">
            {notice}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

          <div className="lg:col-span-8 space-y-5">
            <div className="bg-white rounded-2xl border border-[#E0F2FE] shadow-sm p-5 space-y-4">
              <TextField
                label="Tiêu đề bài viết"
                value={draft.title}
                onChange={(title) => patchDraft({ title })}
                placeholder="vd: Phân tích kỹ thuật thực chiến…"
              />
              <div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Nội dung bài viết
                </span>
                <span className="block text-[11px] text-slate-500 mt-0.5 mb-1.5">
                  Soạn trực tiếp tại đây, lưu xong là bài nằm luôn trong WordPress
                </span>
                <RichTextEditor
                  value={draft.content}
                  onChange={(content) => patchDraft({ content })}
                  credentials={credentials}
                  canUpload={permissions.canUploadFiles}
                />
              </div>
              <TextAreaField
                label="Mô tả ngắn (Excerpt)"
                hint="Đoạn tóm tắt hiển thị trên card ngoài trang chủ & trang danh sách"
                value={draft.excerpt}
                onChange={(excerpt) => patchDraft({ excerpt })}
                rows={3}
              />
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-5">

            {/* Ảnh đại diện */}
            <div className="bg-white rounded-2xl border border-[#E0F2FE] shadow-sm p-5">
              <h3 className="text-sm font-extrabold text-slate-900 mb-3">Ảnh đại diện</h3>

              {draft.featuredMediaUrl ? (
                <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-100 mb-3">
                  <img
                    src={draft.featuredMediaUrl}
                    alt="Ảnh đại diện bài viết"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => patchDraft({ featuredMediaId: 0, featuredMediaUrl: null })}
                    title="Bỏ ảnh đại diện"
                    aria-label="Bỏ ảnh đại diện"
                    className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-white/90 text-slate-600 hover:text-red-600 flex items-center justify-center shadow"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="rounded-xl aspect-video bg-[#F8FBFF] border border-dashed border-[#BFDBFE] flex flex-col items-center justify-center text-slate-400 mb-3">
                  <ImagePlus className="w-7 h-7 mb-1" />
                  <span className="text-[11px]">Chưa có ảnh</span>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload(file);
                }}
                className="hidden"
              />
              {permissions.canUploadFiles ? (
                <>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full py-2.5 bg-[#F0F7FF] text-[#2563EB] border border-[#BFDBFE] rounded-xl text-xs font-bold hover:bg-[#E0F2FE] disabled:opacity-60 transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ImagePlus className="w-3.5 h-3.5" />}
                    {uploading ? 'Đang tải lên…' : 'Chọn ảnh từ máy'}
                  </button>
                  <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                    Ảnh ngang tỉ lệ 16:9, tối thiểu 800px chiều ngang.
                  </p>
                </>
              ) : (
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Tài khoản của bạn không có quyền tải ảnh lên. Nhờ quản trị viên thêm ảnh giúp,
                  hoặc đổi vai trò sang Tác giả.
                </p>
              )}
            </div>

            {/* Danh mục */}
            <div className="bg-white rounded-2xl border border-[#E0F2FE] shadow-sm p-5">
              <h3 className="text-sm font-extrabold text-slate-900 mb-1">Danh mục</h3>
              <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
                Bài phải thuộc <strong>Khoá Học</strong> hoặc <strong>Review Dự Án</strong> mới hiện
                được ngoài site. Nên chọn thêm 1 danh mục chủ đề.
              </p>

              {destination ? (
                <div className="mb-3 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 font-semibold">
                  Bài sẽ hiện ở {destination}
                </div>
              ) : (
                <div className="mb-3 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-800 leading-relaxed">
                  <strong>Chưa chọn danh mục gốc.</strong> Bài lưu xong sẽ nằm im trong WordPress,
                  không hiện ngoài site.
                </div>
              )}

              <div className="space-y-1.5 max-h-56 overflow-y-auto">
                {categories.map((category) => {
                  const isRoot =
                    category.slug === WP_COURSES_CATEGORY || category.slug === WP_PROJECTS_CATEGORY;
                  return (
                    <label
                      key={category.id}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-[#F8FBFF] cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={draft.categories.includes(category.id)}
                        onChange={() => patchDraft({ categories: toggleTerm(draft.categories, category.id) })}
                        className="w-4 h-4 accent-[#2563EB]"
                      />
                      <span
                        className={`text-xs ${isRoot ? 'font-extrabold text-[#2563EB]' : 'font-semibold text-slate-700'}`}
                      >
                        {category.name}
                      </span>
                      {isRoot && (
                        <span className="text-[9px] font-bold text-[#2563EB] bg-[#F0F7FF] px-1.5 py-0.5 rounded">
                          GỐC
                        </span>
                      )}
                      <span className="ml-auto text-[10px] text-slate-400">{category.count}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Thẻ */}
            <div className="bg-white rounded-2xl border border-[#E0F2FE] shadow-sm p-5">
              <h3 className="text-sm font-extrabold text-slate-900 mb-1 flex items-center gap-1.5">
                <TagIcon className="w-4 h-4 text-[#2563EB]" />
                Thẻ
              </h3>
              <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
                Thẻ hiện thành pill trên card và dùng để lọc bài ngoài site.
              </p>

              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleCreateTag();
                    }
                  }}
                  placeholder="Tên thẻ mới…"
                  className="flex-1 px-3 py-2 bg-white border border-[#E0F2FE] rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#2563EB]"
                />
                <button
                  type="button"
                  onClick={handleCreateTag}
                  title="Thêm thẻ"
                  aria-label="Thêm thẻ"
                  className="w-9 h-9 shrink-0 rounded-lg bg-[#2563EB] text-white flex items-center justify-center hover:bg-[#1D4ED8] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto">
                {sortedTags.map((tag) => {
                  const active = draft.tags.includes(tag.id);
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => patchDraft({ tags: toggleTerm(draft.tags, tag.id) })}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-colors ${
                        active
                          ? 'bg-[#2563EB] text-white border-[#2563EB]'
                          : 'bg-[#F8FBFF] text-slate-600 border-[#E0F2FE] hover:border-[#93C5FD] hover:text-[#2563EB]'
                      }`}
                    >
                      #{tag.name}
                    </button>
                  );
                })}
                {sortedTags.length === 0 && (
                  <p className="text-[11px] text-slate-400">Chưa có thẻ nào — tạo thẻ đầu tiên ở trên.</p>
                )}
              </div>
            </div>

          </aside>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Danh sách bài viết
  // -------------------------------------------------------------------------
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">Bài viết WordPress</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {loading ? 'Đang tải…' : `${posts.length} bài viết`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadAll}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-[#E0F2FE] text-slate-700 rounded-xl text-sm font-bold hover:border-[#2563EB] hover:text-[#2563EB] disabled:opacity-60 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Tải lại
          </button>
          <button
            type="button"
            onClick={() => {
              setNotice(null);
              setDraft({ ...EMPTY_DRAFT, status: defaultStatus });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-[#1D4ED8] transition-all"
          >
            <Plus className="w-4 h-4" />
            Viết bài mới
          </button>
        </div>
      </div>

      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 bg-white rounded-xl border border-[#E0F2FE] animate-pulse" />
          ))}
        </div>
      ) : posts.length === 0 && !error ? (
        <div className="bg-white rounded-2xl border border-[#E0F2FE] p-12 text-center">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">Chưa có bài viết nào</h3>
          <p className="text-xs text-slate-500 mt-1">
            Bấm "Viết bài mới" để soạn bài đầu tiên.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E0F2FE] shadow-sm overflow-hidden divide-y divide-[#F0F7FF]">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center gap-4 px-4 py-3.5 hover:bg-[#F8FBFF] transition-colors"
            >
              <div className="w-16 h-11 shrink-0 rounded-lg overflow-hidden bg-slate-100">
                {post.featuredMediaUrl ? (
                  <img src={post.featuredMediaUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <FileText className="w-4 h-4" />
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  setNotice(null);
                  setDraft({
                    id: post.id,
                    title: post.title,
                    content: post.content,
                    excerpt: post.excerpt,
                    status: post.status,
                    categories: post.categories,
                    tags: post.tags,
                    featuredMediaId: post.featuredMediaId,
                    featuredMediaUrl: post.featuredMediaUrl,
                  });
                }}
                className="flex-1 min-w-0 text-left group"
              >
                <span className="block text-sm font-bold text-slate-900 truncate group-hover:text-[#2563EB] transition-colors">
                  {post.title || '(Chưa có tiêu đề)'}
                </span>
                <span className="flex items-center gap-2 mt-0.5">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${STATUS_STYLES[post.status]}`}
                  >
                    {STATUS_LABELS[post.status]}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {new Date(post.date).toLocaleDateString('vi-VN')}
                  </span>
                </span>
              </button>

              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                title="Mở bài trên WordPress"
                aria-label="Mở bài trên WordPress"
                className="w-8 h-8 shrink-0 rounded-lg text-slate-400 hover:bg-[#F0F7FF] hover:text-[#2563EB] flex items-center justify-center transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => handleTrash(post)}
                title="Chuyển vào thùng rác"
                aria-label="Chuyển vào thùng rác"
                className="w-8 h-8 shrink-0 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
