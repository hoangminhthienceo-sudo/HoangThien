import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_SITE_SETTINGS, SiteSettings, mergeSettings } from '../data/siteSettings';
import { isWordPressEnabled } from '../lib/wordpress';
import { fetchSiteSettings } from '../lib/wordpressAdmin';

interface SiteSettingsContextValue {
  settings: SiteSettings;
  loading: boolean;
  /** Nguồn nội dung đang hiển thị */
  source: 'wordpress' | 'default';
  /** Cập nhật settings trong bộ nhớ (dùng cho xem trước ở trang Admin) */
  applySettings: (next: SiteSettings) => void;
  /** Tải lại settings từ WordPress */
  reload: () => void;
}

const SiteSettingsContext = createContext<SiteSettingsContextValue>({
  settings: DEFAULT_SITE_SETTINGS,
  loading: false,
  source: 'default',
  applySettings: () => undefined,
  reload: () => undefined,
});

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [loading, setLoading] = useState<boolean>(isWordPressEnabled());
  const [source, setSource] = useState<'wordpress' | 'default'>('default');
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    if (!isWordPressEnabled()) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    fetchSiteSettings(controller.signal)
      .then((stored) => {
        if (controller.signal.aborted) return;
        if (stored) {
          setSettings(mergeSettings(stored));
          setSource('wordpress');
        } else {
          setSettings(DEFAULT_SITE_SETTINGS);
          setSource('default');
        }
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        console.warn(
          '[WordPress] Dùng nội dung mặc định do lỗi tải cài đặt:',
          err instanceof Error ? err.message : err
        );
        setSettings(DEFAULT_SITE_SETTINGS);
        setSource('default');
        setLoading(false);
      });

    return () => controller.abort();
  }, [nonce]);

  const applySettings = useCallback((next: SiteSettings) => setSettings(next), []);
  const reload = useCallback(() => setNonce((n) => n + 1), []);

  const value = useMemo(
    () => ({ settings, loading, source, applySettings, reload }),
    [settings, loading, source, applySettings, reload]
  );

  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>;
};

export const useSiteSettings = (): SiteSettingsContextValue => useContext(SiteSettingsContext);
