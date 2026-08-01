export type NavTab = 'home' | 'courses' | 'projects' | 'contact';

export interface Course {
  id: string;
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
  isFeatured?: boolean;
}

export interface ProjectReview {
  id: string;
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
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
