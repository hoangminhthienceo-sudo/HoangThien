/**
 * Định danh trang, dùng để tô đậm mục đang mở trên thanh menu.
 * Đường dẫn thật nằm ở src/lib/routes.ts.
 */
export type NavTab = 'home' | 'about' | 'courses' | 'projects' | 'contact';

/**
 * Thẻ (tag) của bài viết. Khi bật WordPress, danh sách này lấy trực tiếp
 * từ tag anh/chị gắn trong WP Admin (Bài viết > Thẻ).
 */
export interface PostTag {
  id: number;
  slug: string;
  name: string;
}

export interface Course {
  id: string;
  /** Phần đuôi đường dẫn: hoangminhthien.com/khoa-hoc/<slug> */
  slug: string;
  title: string;
  category: string;
  categoryLabel: string;
  thumbnail: string;
  badge: string;
  date: string;
  level: 'Người mới' | 'Trung cấp' | 'Chuyên sâu';
  lessonsCount: number;
  duration: string;
  description: string;
  instructor: string;
  rating: number;
  studentsCount: number;
  curriculum: string[];
  tags: PostTag[];
  isFeatured?: boolean;
  /** Link bài gốc trên WordPress (chỉ có khi bài đến từ WP) */
  sourceUrl?: string;
}

export interface ProjectReview {
  id: string;
  /** Phần đuôi đường dẫn: hoangminhthien.com/review-du-an/<slug> */
  slug: string;
  title: string;
  category: string;
  categoryLabel: string;
  thumbnail: string;
  verdict: 'Tiềm Năng Cao' | 'An Toàn & Bền Vững' | 'Cảnh Báo Rủi Ro' | 'Cơ Hội Lớn';
  verdictColor: string;
  riskReward: string;
  rating: number;
  date: string;
  summary: string;
  tokenomics?: string;
  highlights: string[];
  risks: string[];
  onChainMetrics?: string;
  author: string;
  tags: PostTag[];
  /** Link bài gốc trên WordPress (chỉ có khi bài đến từ WP) */
  sourceUrl?: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
