import { Course } from '../types';

export const COURSE_CATEGORIES = [
  { id: 'all', label: 'Tất cả' },
  { id: 'nguoi-moi', label: 'Người mới' },
  { id: 'phan-tich-co-ban', label: 'Phân tích cơ bản' },
  { id: 'phan-tich-ky-thuat', label: 'Phân tích kỹ thuật' },
  { id: 'meo-huong-dan', label: 'Mẹo & hướng dẫn' },
  { id: 'case-study', label: 'Case study' },
  { id: 'onchain-macro', label: 'Onchain & Macro' },
  { id: 'san-giao-dich', label: 'Sàn giao dịch' },
  { id: 'tieu-su', label: 'Tiểu sử' },
  { id: 'report', label: 'Report' },
  { id: 'tong-hop', label: 'Tổng hợp' },
];

export const COURSES_DATA: Course[] = [
  {
    id: 'course-1',
    title: '10 dạng scam Crypto phổ biến người mới cần cẩn trọng',
    category: 'nguoi-moi',
    categoryLabel: 'Người mới',
    thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
    badge: 'SCAM ALERT',
    date: '26/12/2025',
    level: 'Người mới',
    lessonsCount: 10,
    duration: '2.5 giờ',
    description: 'Báo động đỏ về các chiêu trò lừa đảo tinh vi trong thị trường tài chính Crypto: Phishing mail, Fake Wallet Airdrop, Rugpull DEX và quy tắc bảo mật tài sản tuyệt đối.',
    instructor: 'Hoàng Minh Thiên',
    rating: 4.9,
    studentsCount: 3420,
    curriculum: [
      'Tổng quan bức tranh an ninh mạng trong tài chính Crypto',
      'Phân tích 10 chiêu thức lừa đảo phổ biến nhất 2025-2026',
      'Cách sử dụng Ví Lạnh (Cold Wallet) và quy tắc 12 ký tự bảo mật',
      'Kiểm tra Smart Contract phòng tránh bẫy Rugpull & Honeypot',
      'Quy trình khôi phục và bảo vệ tài khoản khẩn cấp'
    ],
    isFeatured: true,
  },
  {
    id: 'course-2',
    title: 'Cộng đồng TradeCoinVN & Block24: Cách tham gia và quyền lợi',
    category: 'nguoi-moi',
    categoryLabel: 'Người mới',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    badge: 'COMMUNITY GUIDE',
    date: '26/12/2025',
    level: 'Người mới',
    lessonsCount: 6,
    duration: '1.5 giờ',
    description: 'Hướng dẫn tham gia mạng lưới kết nối nhà đầu tư thực chiến, nhận báo cáo tín dụng độc quyền và giao lưu trực tiếp với HoangMinhThien.',
    instructor: 'Hoàng Minh Thiên',
    rating: 4.8,
    studentsCount: 2890,
    curriculum: [
      'Giới thiệu hệ sinh thái truyền thông Block24 & TradeCoinVN',
      'Quy định văn hóa và chia sẻ tín hiệu trong nhóm Telegram',
      'Cách nhận thông báo khẩn cấp khi thị trường biến động mạnh',
      'Quyền lợi thành viên Premium & các buổi offline hàng tháng'
    ]
  },
  {
    id: 'course-3',
    title: 'Hành trình phát triển Block24 & TradeCoinVN: Bài học 10 năm',
    category: 'tieu-su',
    categoryLabel: 'Tiểu sử',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    badge: 'STORY & INSIGHTS',
    date: '25/12/2025',
    level: 'Người mới',
    lessonsCount: 8,
    duration: '2.0 giờ',
    description: 'Câu chuyện thực tế đằng sau việc xây dựng nền tảng truyền thông tài chính hàng đầu, những sai lầm đắt giá và tư duy vượt qua mùa Downtrend.',
    instructor: 'Hoàng Minh Thiên',
    rating: 5.0,
    studentsCount: 4100,
    curriculum: [
      'Khởi đầu từ con số 0 trong mùa sóng tài chính 2017',
      'Những thất bại xương máu và bài học quản trị cảm xúc',
      'Xây dựng triết lý đầu tư bền vững: Bảo vệ vốn trước lợi nhuận',
      'Định hướng chiến lược tài chính cá nhân cho thập kỷ mới'
    ]
  },
  {
    id: 'course-4',
    title: 'Giới thiệu tổng quan nền tảng media Block24 & Phân tích thị trường',
    category: 'phan-tich-co-ban',
    categoryLabel: 'Phân tích cơ bản',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    badge: 'OVERVIEW',
    date: '25/12/2025',
    level: 'Trung cấp',
    lessonsCount: 12,
    duration: '4.0 giờ',
    description: 'Phương pháp phân tích vĩ mô, đọc hiểu báo cáo tài chính doanh nghiệp và ma trận 7 bước thẩm định dự án đầu tư.',
    instructor: 'Hoàng Minh Thiên',
    rating: 4.9,
    studentsCount: 1950,
    curriculum: [
      'Bản chất của các chỉ số kinh tế vĩ mô: CPI, FED Rate, GDP',
      'Cách thẩm định đội ngũ Founder, Whitepaper và Tokenomics',
      'Đánh giá vòng gọi vốn (Seed, Private, Strategic, Public)',
      'Thực hành lập bảng điểm đánh giá dự án thực tế'
    ]
  },
  {
    id: 'course-5',
    title: 'Coinbase Ventures là gì? Tìm hiểu về Crypto VC top đầu thị trường',
    category: 'tong-hop',
    categoryLabel: 'Tổng hợp',
    thumbnail: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80',
    badge: 'VC ANALYSIS',
    date: '21/12/2025',
    level: 'Trung cấp',
    lessonsCount: 7,
    duration: '2.2 giờ',
    description: 'Khám phá chiến lược rót vốn của Coinbase Ventures - Quỹ đầu tư mạo hiểm Tier-1 và cách đi theo dấu chân của gã khổng lồ.',
    instructor: 'Hoàng Minh Thiên',
    rating: 4.7,
    studentsCount: 1620,
    curriculum: [
      'Lịch sử hình thành và vị thế của Coinbase Ventures',
      'Danh mục đầu tư trọng điểm (Portfolio Breakdown)',
      'So sánh chiến lược đầu tư của Coinbase vs Binance Labs',
      'Cách săn các kèo chưa ra token từ portfolio của quỹ Tier-1'
    ]
  },
  {
    id: 'course-6',
    title: 'Tìm hiểu a16z: VC top đầu đứng sau các dự án lớn',
    category: 'tong-hop',
    categoryLabel: 'Tổng hợp',
    thumbnail: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80',
    badge: 'a16z CRYPTO',
    date: '14/12/2025',
    level: 'Chuyên sâu',
    lessonsCount: 9,
    duration: '3.0 giờ',
    description: 'Phân tích Andreessen Horowitz (a16z) - Quỹ tài chính định hình công nghệ thế giới. Cách họ dẫn dắt xu hướng Web3 & AI.',
    instructor: 'Hoàng Minh Thiên',
    rating: 4.9,
    studentsCount: 2280,
    curriculum: [
      'Sức mạnh truyền thông và quy mô tài sản của a16z',
      'Khảo sát các luận điểm đầu tư nổi bật (Crypto State Report)',
      'Dự đoán xu hướng công nghệ tiếp theo được a16z rót vốn',
      'Bài học áp dụng cho quy trình chọn mã cổ phiếu/token cá nhân'
    ]
  },
  {
    id: 'course-7',
    title: 'Mastering Onchain & Macro: Đọc vị dòng tiền thông minh',
    category: 'onchain-macro',
    categoryLabel: 'Onchain & Macro',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    badge: 'ONCHAIN PRO',
    date: '10/12/2025',
    level: 'Chuyên sâu',
    lessonsCount: 15,
    duration: '5.5 giờ',
    description: 'Sử dụng Glassnode, Nansen, Dune Analytics để theo dõi biến động số dư của Cá Voi (Whales) và xu hướng rút/nạp sàn.',
    instructor: 'Hoàng Minh Thiên',
    rating: 5.0,
    studentsCount: 1840,
    curriculum: [
      'Các chỉ số On-chain cốt lõi: MVRV-Z, SOPR, Exchange Netflow',
      'Lập Dashboard theo dõi ví Cá Voi trên Dune Analytics',
      'Nhận biết tín hiệu gom hàng & xả hàng của nhà lập quy',
      'Kết hợp dữ liệu On-chain với khung kỹ thuật HTF'
    ]
  },
  {
    id: 'course-8',
    title: 'Phân tích kỹ thuật thực chiến: Mô hình nến & Quản trị R/R',
    category: 'phan-tich-ky-thuat',
    categoryLabel: 'Phân tích kỹ thuật',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    badge: 'TECHNICAL TRADING',
    date: '05/12/2025',
    level: 'Trung cấp',
    lessonsCount: 14,
    duration: '4.5 giờ',
    description: 'Hệ thống giao dịch dựa trên Price Action, cấu trúc thị trường (BOS/CHoCH) và nguyên lý quản lý vốn tỷ lệ R/R chuẩn 1:3.',
    instructor: 'Hoàng Minh Thiên',
    rating: 4.9,
    studentsCount: 3100,
    curriculum: [
      'Xác định xu hướng chính và vùng hỗ trợ/kháng cự quan trọng',
      'Sử dụng Fibonacci Retracement xác định vùng tích lũy',
      'Chiến lược đi vốn 3 phần phòng tránh FOMO',
      'Nhật ký giao dịch và kỷ luật cắt lỗ tự động'
    ]
  }
];
