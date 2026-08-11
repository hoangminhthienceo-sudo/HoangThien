/**
 * Nguồn duy nhất cho toàn bộ link mạng xã hội của HoangMinhThien.
 * Sửa ở đây là đổi ở mọi nơi (Hero, bảng chỉ số Media, Footer).
 *
 * TODO: xác nhận lại handle chính chủ của TikTok và X trước khi lên production.
 */
export interface SocialChannel {
  id: 'tiktok' | 'youtube' | 'telegram' | 'facebook' | 'x';
  label: string;
  shortLabel: string;
  metricLabel: string;
  url: string;
  followers: number;
}

export const SOCIAL_CHANNELS: SocialChannel[] = [
  {
    id: 'tiktok',
    label: 'TikTok',
    shortLabel: 'TK',
    metricLabel: 'TikTok Followers',
    url: 'https://www.tiktok.com/@hoangminhthien',
    followers: 70000,
  },
  {
    id: 'youtube',
    label: 'YouTube',
    shortLabel: 'YT',
    metricLabel: 'YouTube Subs',
    url: 'https://www.youtube.com/@hoangminhthien',
    followers: 200000,
  },
  {
    id: 'telegram',
    label: 'Telegram',
    shortLabel: 'TG',
    metricLabel: 'Telegram Members',
    url: 'https://t.me/hoangminhthien',
    followers: 100000,
  },
  {
    id: 'facebook',
    label: 'Facebook',
    shortLabel: 'FB',
    metricLabel: 'Facebook Follow',
    url: 'https://www.facebook.com/hoangminhthien.tradecoinvn',
    followers: 150000,
  },
  {
    id: 'x',
    label: 'X (Twitter)',
    shortLabel: 'X',
    metricLabel: 'X Followers',
    url: 'https://x.com/hoangminhthien',
    followers: 50000,
  },
];

export const TELEGRAM_MAIN_URL = 'https://t.me/hoangminhthien';
export const TELEGRAM_TEAM_URL = 'https://t.me/taisansotradecoinvn';
