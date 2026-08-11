import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  FileText,
  Link2,
  Loader2,
  LogOut,
  Lock,
  RotateCcw,
  Save,
  Type,
} from 'lucide-react';
import { DEFAULT_SITE_SETTINGS, SiteSettings } from '../data/siteSettings';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { WP_BASE_URL, isWordPressEnabled } from '../lib/wordpress';
import {
  WPCredentials,
  WPUser,
  clearCredentials,
  loadCredentials,
  saveCredentials,
  saveSiteSettings,
  verifyCredentials,
} from '../lib/wordpressAdmin';
import { ContentTab } from '../components/admin/ContentTab';
import { LinksTab } from '../components/admin/LinksTab';
import { PostsTab } from '../components/admin/PostsTab';

type AdminTab = 'content' | 'links' | 'posts';

const TABS: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
  { id: 'content', label: 'Nội dung trang', icon: <Type className="w-4 h-4" /> },
  { id: 'links', label: 'Liên kết', icon: <Link2 className="w-4 h-4" /> },
  { id: 'posts', label: 'Bài viết', icon: <FileText className="w-4 h-4" /> },
];

/** Tải cài đặt hiện tại về máy dạng JSON — dùng khi chưa có WordPress */
const downloadSettings = (settings: SiteSettings) => {
  const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'site-settings.json';
  link.click();
  URL.revokeObjectURL(url);
};

export const AdminPage: React.FC = () => {
  const { settings, applySettings, reload } = useSiteSettings();

  const [credentials, setCredentials] = useState<WPCredentials | null>(loadCredentials);
  const [user, setUser] = useState<WPUser | null>(null);
  const [checkingSession, setCheckingSession] = useState<boolean>(!!loadCredentials());

  const [username, setUsername] = useState('');
  const [appPassword, setAppPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<AdminTab>('content');
  const [draft, setDraft] = useState<SiteSettings>(settings);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);

  // Đồng bộ bản nháp khi settings từ WordPress tải xong
  useEffect(() => setDraft(settings), [settings]);

  // Kiểm tra phiên đăng nhập đã lưu còn dùng được không
  useEffect(() => {
    const stored = loadCredentials();
    if (!stored) return;

    verifyCredentials(stored)
      .then((verified) => {
        setUser(verified);
        setCredentials(stored);
      })
      .catch(() => {
        clearCredentials();
        setCredentials(null);
      })
      .finally(() => setCheckingSession(false));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoggingIn(true);

    const attempt: WPCredentials = { username: username.trim(), appPassword };
    try {
      const verified = await verifyCredentials(attempt);
      saveCredentials(attempt);
      setCredentials(attempt);
      setUser(verified);
      setAppPassword('');
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Đăng nhập thất bại');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    clearCredentials();
    setCredentials(null);
    setUser(null);
  };

  const handleSaveSettings = async () => {
    if (!credentials) return;
    setSaving(true);
    setNotice(null);
    try {
      await saveSiteSettings(credentials, draft);
      applySettings(draft);
      setNotice({ type: 'ok', text: 'Đã lưu nội dung lên WordPress. Tải lại trang chủ để xem.' });
    } catch (err) {
      setNotice({
        type: 'error',
        text: err instanceof Error ? err.message : 'Lưu thất bại',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (!window.confirm('Khôi phục toàn bộ nội dung về mặc định ban đầu?')) return;
    setDraft(DEFAULT_SITE_SETTINGS);
    setNotice({ type: 'ok', text: 'Đã khôi phục về mặc định. Bấm Lưu để ghi lên WordPress.' });
  };

  const hasChanges = JSON.stringify(draft) !== JSON.stringify(settings);

  // -------------------------------------------------------------------------
  // Chưa cấu hình WordPress
  // -------------------------------------------------------------------------
  if (!isWordPressEnabled()) {
    return (
      <div className="min-h-screen bg-[#F0F7FF] pt-28 pb-20 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#E0F2FE] shadow-sm p-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 mb-2">Chưa kết nối WordPress</h1>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            Trang Admin cần WordPress để lưu nội dung. Hãy cài WordPress theo hướng dẫn trong file{' '}
            <code className="px-1.5 py-0.5 rounded bg-[#F0F7FF] text-[#2563EB] font-bold">
              WORDPRESS.md
            </code>
            , rồi điền <code className="px-1.5 py-0.5 rounded bg-[#F0F7FF] text-[#2563EB] font-bold">
              VITE_WP_API_URL
            </code>{' '}
            vào file <code className="px-1.5 py-0.5 rounded bg-[#F0F7FF] text-[#2563EB] font-bold">.env</code>.
          </p>
          <p className="text-xs text-slate-500 mb-6">
            Trong lúc chờ, anh/chị vẫn có thể chỉnh nội dung rồi tải file JSON về để dùng làm nội
            dung mặc định trong code.
          </p>
          <button
            type="button"
            onClick={() => downloadSettings(settings)}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#F0F7FF] text-[#2563EB] border border-[#BFDBFE] rounded-xl text-sm font-bold hover:bg-[#E0F2FE] transition-colors"
          >
            <Download className="w-4 h-4" />
            Tải nội dung hiện tại (JSON)
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Màn hình đăng nhập
  // -------------------------------------------------------------------------
  if (!credentials || !user) {
    return (
      <div className="min-h-screen bg-[#F0F7FF] pt-28 pb-20 px-4">
        <div className="max-w-md mx-auto bg-white rounded-3xl border border-[#E0F2FE] shadow-sm p-8">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900">Đăng nhập quản trị</h1>
            <p className="text-xs text-slate-500 mt-1.5 break-all">{WP_BASE_URL}</p>
          </div>

          {checkingSession ? (
            <div className="flex items-center justify-center py-8 text-slate-500 gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm">Đang kiểm tra phiên đăng nhập…</span>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <label className="block">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Tên đăng nhập WordPress
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                  className="mt-1.5 w-full px-3.5 py-2.5 bg-white border border-[#E0F2FE] rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#2563EB]"
                />
              </label>

              <label className="block">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Application Password
                </span>
                <span className="block text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Tạo trong WP Admin → Người dùng → Hồ sơ → Application Passwords.
                  Đây <strong>không phải</strong> mật khẩu đăng nhập WordPress thường.
                </span>
                <input
                  type="password"
                  value={appPassword}
                  onChange={(e) => setAppPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  placeholder="xxxx xxxx xxxx xxxx xxxx xxxx"
                  className="mt-1.5 w-full px-3.5 py-2.5 bg-white border border-[#E0F2FE] rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#2563EB]"
                />
              </label>

              {loginError && (
                <div className="px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={loggingIn}
                className="w-full py-3 bg-[#2563EB] text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/25 hover:bg-[#1D4ED8] disabled:opacity-60 transition-all inline-flex items-center justify-center gap-2"
              >
                {loggingIn && <Loader2 className="w-4 h-4 animate-spin" />}
                {loggingIn ? 'Đang kiểm tra…' : 'Đăng nhập'}
              </button>

              <p className="text-[11px] text-slate-500 leading-relaxed pt-2 border-t border-[#F0F7FF]">
                Thông tin đăng nhập chỉ lưu trong phiên trình duyệt hiện tại, đóng tab là mất.
                Chỉ đăng nhập trên máy tin cậy và đảm bảo domain WordPress dùng HTTPS.
              </p>
            </form>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Bảng điều khiển
  // -------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#F0F7FF] pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="bg-white rounded-2xl border border-[#E0F2FE] shadow-sm p-5 sm:p-6 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">Bảng quản trị nội dung</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Đăng nhập với <strong className="text-slate-700">{user.name}</strong> · {WP_BASE_URL}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => downloadSettings(draft)}
              title="Tải nội dung về máy dạng JSON"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-[#E0F2FE] text-slate-700 rounded-xl text-sm font-bold hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Xuất JSON</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-[#E0F2FE] text-slate-700 rounded-xl text-sm font-bold hover:border-red-300 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-[#E0F2FE] shadow-sm mb-5 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:bg-[#F0F7FF] hover:text-[#2563EB]'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {notice && (
          <div
            className={`px-4 py-3 rounded-xl mb-5 text-sm flex items-start gap-2 ${
              notice.type === 'ok'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}
          >
            {notice.type === 'ok' ? (
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
            )}
            <span>{notice.text}</span>
          </div>
        )}

        {/* Nội dung tab */}
        {activeTab === 'content' && <ContentTab settings={draft} onChange={setDraft} />}
        {activeTab === 'links' && <LinksTab settings={draft} onChange={setDraft} />}
        {activeTab === 'posts' && <PostsTab credentials={credentials} />}

        {/* Thanh lưu cố định — chỉ hiện ở 2 tab chỉnh cài đặt */}
        {activeTab !== 'posts' && (
          <div className="sticky bottom-4 mt-5">
            <div className="bg-white rounded-2xl border border-[#E0F2FE] shadow-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs text-slate-500">
                {hasChanges ? (
                  <span className="font-bold text-amber-600">Có thay đổi chưa lưu</span>
                ) : (
                  'Nội dung đang khớp với bản trên WordPress'
                )}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-[#E0F2FE] text-slate-600 rounded-xl text-sm font-bold hover:border-slate-300 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Về mặc định
                </button>
                <button
                  type="button"
                  onClick={() => {
                    applySettings(draft);
                    setNotice({
                      type: 'ok',
                      text: 'Đã áp dụng để xem trước. Nội dung chỉ lưu vĩnh viễn khi bấm "Lưu lên WordPress".',
                    });
                  }}
                  className="px-4 py-2.5 bg-[#F0F7FF] text-[#2563EB] border border-[#BFDBFE] rounded-xl text-sm font-bold hover:bg-[#E0F2FE] transition-colors"
                >
                  Xem trước
                </button>
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-[#1D4ED8] disabled:opacity-60 transition-all"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {saving ? 'Đang lưu…' : 'Lưu lên WordPress'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              reload();
              window.location.hash = '';
            }}
            className="text-xs font-bold text-slate-500 hover:text-[#2563EB] transition-colors"
          >
            ← Về trang chủ
          </button>
        </div>

      </div>
    </div>
  );
};
