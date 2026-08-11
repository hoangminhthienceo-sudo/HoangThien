/**
 * Toàn bộ nội dung chữ & link có thể sửa từ trang Admin (#admin).
 *
 * File này là GIÁ TRỊ MẶC ĐỊNH. Khi đã kết nối WordPress, bản chỉnh sửa thật
 * được lưu trên WP (option `hmt_site_settings`) và ghi đè lên các giá trị ở đây.
 * Nếu WP chưa cấu hình / không kết nối được, site chạy bằng đúng file này.
 */
import { SOCIAL_CHANNELS, SocialChannel, TELEGRAM_MAIN_URL, TELEGRAM_TEAM_URL } from './socialLinks';
import workshop1Image from '../assets/images/regenerated_image_1785579950219.jpg';
import workshop2Image from '../assets/images/regenerated_image_1785579958169.jpg';
import workshop3Image from '../assets/images/regenerated_image_1785579961975.jpg';
import workshop4Image from '../assets/images/regenerated_image_1785579966067.jpg';

export interface Pillar {
  title: string;
  description: string;
}

/** Một ảnh trong khối "Hình Ảnh Sự Kiện & Hội Thảo Thực Chiến" */
export interface GalleryItem {
  /** Đường dẫn ảnh — ảnh mặc định đi kèm mã nguồn, hoặc link ảnh tải lên WordPress */
  image: string;
  title: string;
  caption: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface Achievement {
  value: string;
  label: string;
}

export interface SectionHeading {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export interface SiteSettings {
  brand: {
    name: string;
    nameAccent: string;
    tagline: string;
  };
  hero: {
    badge: string;
    titleLead: string;
    titleHighlight: string;
    titleTail: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    channelsLabel: string;
    profileRole: string;
    profileName: string;
    profileNote: string;
  };
  homeAbout: {
    eyebrow: string;
    title: string;
    quote: string;
    paragraphs: string[];
    pillars: Pillar[];
    ctaLabel: string;
    galleryTitle: string;
    gallerySubtitle: string;
    galleryCtaLabel: string;
  };
  achievements: Achievement[];
  mediaProof: SectionHeading;
  coursesPreview: SectionHeading & { ctaLabel: string };
  projectsPreview: SectionHeading & { ctaLabel: string };
  aboutPage: {
    title: string;
    intro: string;
    quote: string;
    paragraphs: string[];
    pillars: Pillar[];
    milestonesTitle: string;
    milestones: Milestone[];
    galleryTitle: string;
    gallerySubtitle: string;
    closingTitle: string;
    closingSubtitle: string;
  };
  /** Thư viện ảnh sự kiện, dùng chung cho trang chủ và trang Giới Thiệu */
  gallery: GalleryItem[];
  social: SocialChannel[];
  contact: {
    email: string;
    telegramHandle: string;
    telegramUrl: string;
    telegramTeamUrl: string;
  };
  footer: {
    description: string;
    bannerEyebrow: string;
    bannerTitle: string;
    bannerSubtitle: string;
    disclaimer: string;
    copyright: string;
  };
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  brand: {
    name: 'HOANG',
    nameAccent: 'MINHTHIEN',
    tagline: '10 Năm Thực Chiến Tài Chính',
  },

  hero: {
    badge: 'Chuyên Gia Phân Tích & Cố Vấn Đầu Tư Thực Chiến',
    titleLead: '10 Năm Thực Chiến Tài Chính &',
    titleHighlight: 'Định Hình Tư Duy',
    titleTail: 'Đầu Tư Bền Vững Cho Nhà Đầu Tư Việt',
    subtitle:
      'Góc nhìn phân tích chuyên sâu & Quản trị rủi ro tối ưu từ HoangMinhThien. Đồng hành cùng nhà đầu tư định vị thị trường, kiểm soát cảm xúc và kiến tạo dòng tiền an toàn.',
    primaryCta: 'Khám Phá Khoá Học',
    secondaryCta: 'Tham Gia Telegram',
    channelsLabel: 'Kênh Truyền Thông Chính Thức',
    profileRole: 'Founder & Lead Analyst',
    profileName: 'Hoàng Minh Thiên',
    profileNote: '10 Năm Kinh Nghiệm Thực Chiến Thị Trường Tài Chính',
  },

  homeAbout: {
    eyebrow: 'Câu Chuyện Làm Nghề',
    title: 'Hành Trình 10 Năm Từ Thực Chiến Đến Cố Vấn Đầu Tư',
    quote: '"Lợi nhuận đến từ sự thấu hiểu, không đến từ sự may mắn."',
    paragraphs: [
      'Tôi bắt đầu hành trình từ những năm thị trường tài chính đầy biến động. Qua hơn 10 năm làm nghề — kinh qua hàng trăm chu kỳ tăng giảm của thị trường, tham gia quản lý danh mục và phân tích chuyên sâu cho hàng ngàn nhà đầu tư — bài học lớn nhất tôi đúc kết được là tính kỷ luật và quản trị rủi ro.',
      "Trang web này không chỉ là nơi chia sẻ kiến thức, mà là cuốn nhật ký thực chiến 10 năm của tôi. Nơi bạn tìm thấy những góc nhìn minh bạch, những dự án được 'soi' kỹ lưỡng và các chương trình đào tạo giúp bạn tự chủ tài chính.",
    ],
    pillars: [
      {
        title: 'Phân Tích Dòng Tiền',
        description: 'Đọc vị chu kỳ kinh tế vĩ mô & dòng tiền thông minh.',
      },
      {
        title: 'Bảo Vệ Tài Sản',
        description: 'Chiến lược phân bổ vốn giảm rủi ro tối đa.',
      },
    ],
    ctaLabel: 'Xem Chi Tiết Hành Trình 10 Năm',
    galleryTitle: 'Hình Ảnh Sự Kiện & Hội Thảo Thực Chiến',
    gallerySubtitle: 'Các buổi kết nối cộng đồng, workshop đào tạo và gặp gỡ chuyên gia',
    galleryCtaLabel: 'Xem Trang Giới Thiệu',
  },

  achievements: [
    { value: '10+ Năm', label: 'Thực chiến thị trường' },
    { value: '+1.000', label: 'Khách hàng & Học viên' },
    { value: '+500K', label: 'Lượt đọc báo cáo phân tích' },
    { value: '+50', label: 'Sự kiện & Workshop' },
  ],

  mediaProof: {
    eyebrow: 'Sức Ảnh Hưởng Media',
    title: 'Sự Tin Tưởng & Kết Nối Từ Cộng Đồng',
    subtitle:
      'Được theo dõi và đồng hành bởi hơn 500.000 nhà đầu tư trên khắp các nền tảng truyền thông. Bấm vào từng ô để mở kênh chính thức.',
  },

  coursesPreview: {
    eyebrow: 'Đào Tạo Chuyên Sâu',
    title: 'Khóa Học Thực Chiến Mới Nhất',
    subtitle: 'Nâng cao tư duy, phân tích dòng tiền và tự tin ra quyết định phân bổ vốn.',
    ctaLabel: 'Xem Tất Cả Khóa Học',
  },

  projectsPreview: {
    eyebrow: 'Báo Cáo Thẩm Định',
    title: 'Phân Tích & Review Dự Án Nổi Bật',
    subtitle: 'Góc nhìn minh bạch, minh chứng dữ liệu On-chain & trải nghiệm thực tế.',
    ctaLabel: 'Xem Tất Cả Review',
  },

  aboutPage: {
    title: 'Hành Trình 10 Năm Từ Thực Chiến Đến Cố Vấn Đầu Tư',
    intro:
      'Tôi là Hoàng Minh Thiên — Founder & Lead Analyst. Hơn 10 năm qua, tôi kinh qua hàng trăm chu kỳ tăng giảm của thị trường tài chính, tham gia quản lý danh mục và phân tích chuyên sâu cho hàng ngàn nhà đầu tư. Bài học lớn nhất tôi đúc kết được không nằm ở việc bắt đúng đỉnh đáy, mà ở tính kỷ luật và quản trị rủi ro.',
    quote: '"Lợi nhuận đến từ sự thấu hiểu, không đến từ sự may mắn."',
    paragraphs: [
      'Tôi bắt đầu hành trình từ những năm thị trường tài chính đầy biến động. Qua hơn 10 năm làm nghề — kinh qua hàng trăm chu kỳ tăng giảm, tham gia quản lý danh mục và phân tích chuyên sâu cho hàng ngàn nhà đầu tư — điều tôi giữ lại được không phải là một công thức thần kỳ, mà là một bộ nguyên tắc.',
      'Nguyên tắc đầu tiên: bảo vệ vốn trước khi nghĩ đến lợi nhuận. Nguyên tắc thứ hai: mọi quyết định phân bổ vốn đều phải trả lời được câu hỏi "nếu tôi sai thì mất bao nhiêu?". Và nguyên tắc thứ ba: thị trường không nợ ai điều gì — kỷ luật mới là thứ tạo ra kết quả dài hạn.',
      "Trang web này không chỉ là nơi chia sẻ kiến thức, mà là cuốn nhật ký thực chiến 10 năm của tôi. Nơi bạn tìm thấy những góc nhìn minh bạch, những dự án được 'soi' kỹ lưỡng và các chương trình đào tạo giúp bạn tự chủ tài chính.",
    ],
    pillars: [
      {
        title: 'Phân Tích Dòng Tiền',
        description:
          'Đọc vị chu kỳ kinh tế vĩ mô & dòng tiền thông minh. Kết hợp dữ liệu On-chain, báo cáo tài chính doanh nghiệp và các chỉ số vĩ mô để xác định vị trí thật của thị trường.',
      },
      {
        title: 'Bảo Vệ Tài Sản',
        description:
          'Chiến lược phân bổ vốn giảm rủi ro tối đa. Mỗi vị thế đều có kịch bản thoát, mỗi danh mục đều có giới hạn thua lỗ được xác định trước khi vào lệnh.',
      },
      {
        title: 'Đồng Hành Cộng Đồng',
        description:
          'Hơn 500.000 nhà đầu tư theo dõi trên các nền tảng truyền thông. Báo cáo và tín hiệu được chia sẻ minh bạch, miễn phí trên kênh Telegram chính thức.',
      },
    ],
    milestonesTitle: '10 Năm Trong Thị Trường Tài Chính',
    milestones: [
      {
        year: '2016 - 2017',
        title: 'Những bước chân đầu tiên',
        description:
          'Bắt đầu từ con số 0 giữa mùa sóng tài chính 2017. Học cách đọc thị trường bằng chính tài khoản của mình — và trả học phí cho từng sai lầm về quản trị cảm xúc.',
      },
      {
        year: '2018 - 2020',
        title: 'Kinh qua chu kỳ Downtrend',
        description:
          'Ba năm thị trường ảm đạm là giai đoạn rèn giũa quan trọng nhất: hệ thống hóa phương pháp phân tích cơ bản, xây dựng quy tắc cắt lỗ và nguyên tắc bảo toàn vốn.',
      },
      {
        year: '2021 - 2023',
        title: 'Xây dựng nền tảng truyền thông',
        description:
          'Phát triển hệ sinh thái Block24 & TradeCoinVN, đưa báo cáo phân tích chuyên sâu tới hàng trăm ngàn nhà đầu tư Việt Nam trên đa nền tảng.',
      },
      {
        year: '2024 - Nay',
        title: 'Cố vấn & Đào tạo chuyên sâu',
        description:
          'Tập trung vào đào tạo tư duy đầu tư bền vững, thẩm định dự án độc lập và đồng hành cùng nhà đầu tư trong việc phân bổ vốn an toàn qua các chu kỳ.',
      },
    ],
    galleryTitle: 'Hình Ảnh Sự Kiện & Hội Thảo Thực Chiến',
    gallerySubtitle: 'Các buổi kết nối cộng đồng, workshop đào tạo và gặp gỡ chuyên gia',
    closingTitle: 'Bắt đầu hành trình đầu tư có kỷ luật của bạn',
    closingSubtitle:
      'Xem các khoá học thực chiến hoặc liên hệ trực tiếp để được cố vấn phân bổ vốn.',
  },

  gallery: [
    {
      image: workshop1Image,
      title: 'Diễn Thuyết Tại Workshop Tài Chính',
      caption: 'Chia sẻ góc nhìn kinh tế vĩ mô',
    },
    {
      image: workshop2Image,
      title: 'Gặp Gỡ Đối Tác & Quỹ Đầu Tư',
      caption: 'Thẩm định dự án thực tế',
    },
    {
      image: workshop3Image,
      title: 'Lớp Đào Tạo Chuyên Sâu Masterclass',
      caption: 'Hướng dẫn học viên 1-1',
    },
    {
      image: workshop4Image,
      title: 'Offline Tín Hiệu & Giao Lưu',
      caption: 'Kết nối thành viên Telegram',
    },
  ],

  social: SOCIAL_CHANNELS,

  contact: {
    email: 'hoangminhthien.ceo@gmail.com',
    telegramHandle: '@hoangminhthien',
    telegramUrl: TELEGRAM_MAIN_URL,
    telegramTeamUrl: TELEGRAM_TEAM_URL,
  },

  footer: {
    description:
      'Đồng hành cùng nhà đầu tư định hình tư duy tài chính dài hạn, kiểm soát rủi ro và tìm kiếm cơ hội tăng trưởng bền vững dựa trên 10 năm kinh nghiệm thực chiến.',
    bannerEyebrow: 'Nhận Báo Cáo Phân Tích Mới Nhất',
    bannerTitle: 'Gia Nhập Kênh Telegram Chính Thức Của HoangMinhThien',
    bannerSubtitle:
      'Cập nhật tín hiệu thị trường vĩ mô, cảnh báo rủi ro & danh mục dự án tiềm năng 2026.',
    disclaimer:
      'Tất cả thông tin, phân tích và tài liệu trên hoangminhthien.com hoàn toàn mang tính chất chia sẻ kiến thức thực chiến và góc nhìn cá nhân, không cấu thành lời khuyên đầu tư tài chính. Thị trường tài chính luôn tiềm ẩn rủi ro, hãy tự nghiên cứu kỹ lưỡng (DYOR) trước khi đưa ra bất kỳ quyết định phân bổ vốn nào.',
    copyright: '© Copyright By hoangminhthien.com 2026. All Rights Reserved.',
  },
};

/**
 * Trộn cài đặt lưu trên WordPress với mặc định, theo từng cấp.
 * Thiếu field nào thì lấy mặc định — thêm field mới trong code không làm vỡ
 * bản settings cũ đang lưu trên WP.
 */
export const mergeSettings = (
  stored: unknown,
  base: SiteSettings = DEFAULT_SITE_SETTINGS
): SiteSettings => {
  if (!stored || typeof stored !== 'object') return base;

  const merge = (target: any, source: any): any => {
    if (Array.isArray(source)) return source.length > 0 ? source : target;
    if (source && typeof source === 'object' && !Array.isArray(target)) {
      const result: Record<string, unknown> = { ...target };
      Object.keys(source).forEach((key) => {
        result[key] = key in target ? merge(target[key], source[key]) : source[key];
      });
      return result;
    }
    return source === undefined || source === null || source === '' ? target : source;
  };

  return merge(base, stored) as SiteSettings;
};
