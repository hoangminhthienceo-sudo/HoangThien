import { ProjectReview } from '../types';

export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'Tất cả Dự Án' },
  { id: 'layer-1-2', label: 'Crypto Layer 1/2' },
  { id: 'defi-rwa', label: 'DeFi & RWA' },
  { id: 'bat-dong-san', label: 'Bất Động Sản' },
  { id: 'chung-khoan', label: 'Chứng Khoán' },
  { id: 'airdrop-retro', label: 'Airdrop & Retroactive' },
  { id: 'research-report', label: 'Báo Cáo Research' },
  { id: 'exchanges-vcs', label: 'Sàn Giao Dịch & Quỹ' },
];

export const PROJECTS_DATA: ProjectReview[] = [
  {
    id: 'proj-1',
    title: 'Arbitrum (ARB): Hệ Sinh Thái Layer-2 Dẫn Đầu TVL & Khả Năng Mở Rộng',
    category: 'layer-1-2',
    categoryLabel: 'Crypto Layer 1/2',
    thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
    verdict: 'Tiềm Năng Cao',
    verdictColor: 'bg-blue-100 text-blue-700 border-blue-200',
    riskReward: 'Tỷ lệ R/R: 1:4 (Thấp-Trung)',
    rating: 4.8,
    date: '28/12/2025',
    summary: 'Đánh giá chi tiết công nghệ Optimistic Rollup, khả năng xử lý phí gas siêu rẻ, tốc độ tăng trưởng dApp và lộ trình Unlock Token năm 2026.',
    tokenomics: 'Tổng cung 10 Tỷ ARB. Circulating Supply ~38%. Lịch trả Token cho Team & Investors kéo dài theo tuyến tính 3 năm.',
    highlights: [
      'Top 1 TVL Layer-2 trên Ethereum với hơn 3.2 Tỷ USD.',
      'Được tích hợp bởi hàng loạt dự án DeFi hàng đầu như GMX, Uniswap v3, Aave.',
      'Khí gas rẻ hơn 95% so với Ethereum Mainnet.'
    ],
    risks: [
      'Lịch unlock token định kỳ tạo áp lực bán ngắn hạn.',
      'Cạnh tranh gay gắt từ các giải pháp Zero-Knowledge (ZK-Rollups) như ZKSync, Starknet.'
    ],
    onChainMetrics: 'Số lượng ví hoạt động hàng ngày (Daily Active Addresses) duy trì trung bình 180k ví.',
    author: 'Hoàng Minh Thiên'
  },
  {
    id: 'proj-2',
    title: 'Căn Hộ Dòng Tiền Ven Biển Phan Thiết: Đánh Giá Hạ Tầng & Pháp Lý',
    category: 'bat-dong-san',
    categoryLabel: 'Bất Động Sản',
    thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    verdict: 'An Toàn & Bền Vững',
    verdictColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    riskReward: 'Lợi suất 8.5%/Năm',
    rating: 4.7,
    date: '22/12/2025',
    summary: 'Báo cáo khảo sát thực địa dự án căn hộ nghỉ dưỡng ven biển. Phân tích tác động tích cực từ Cao tốc Dầu Giây - Phan Thiết và Sân bay quốc tế.',
    tokenomics: 'Giá khởi điểm 2.2 Tỷ VNĐ/Căn. Tiến độ thanh toán linh hoạt 18 tháng. Ngân hàng hỗ trợ ân hạn nợ gốc 24 tháng.',
    highlights: [
      'Pháp lý hoàn chỉnh 100%, Sổ hồng lâu dài.',
      'Tỷ lệ lấp đầy phòng du lịch đạt 65-75% trong các đợt cao điểm.',
      'Đơn vị quản lý vận hành quốc tế đảm bảo chất lượng tài sản.'
    ],
    risks: [
      'Thanh khoản thứ cấp mất 3-6 tháng để chốt giao dịch.',
      'Phụ thuộc vào biến động chung của ngành du lịch nội địa.'
    ],
    onChainMetrics: 'Dòng tiền cho thuê thực tế ghi nhận 15-18 triệu VNĐ/tháng.',
    author: 'Hoàng Minh Thiên'
  },
  {
    id: 'proj-3',
    title: 'Ondo Finance (ONDO): Dẫn Đầu Xu Hướng Real World Assets (RWA)',
    category: 'defi-rwa',
    categoryLabel: 'DeFi & RWA',
    thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    verdict: 'Cơ Hội Lớn',
    verdictColor: 'bg-purple-100 text-purple-700 border-purple-200',
    riskReward: 'Tỷ lệ R/R: 1:3.5',
    rating: 4.9,
    date: '18/12/2025',
    summary: 'Phân tích dự án token hóa tài sản thực (Trái phiếu chính phủ Mỹ) On-chain được rót vốn bởi Founders Fund và Pantera Capital.',
    tokenomics: 'Mã token ONDO phục vụ Governance và Staking thưởng收益. Mức tăng trưởng TVL RWA vượt 600 triệu USD.',
    highlights: [
      'Cầu nối trực tiếp giữa dòng tiền tài chính truyền thống (TradFi) và Crypto.',
      'Sản phẩm USDY mang lại lợi suất an toàn 5.2%/năm từ T-Bills Mỹ.',
      'Quan hệ hợp tác chiến lược với BlackRock và Morgan Stanley.'
    ],
    risks: [
      'Rủi ro về khung pháp lý Mỹ (SEC) đối với chứng khoán token hóa.',
      'Phụ thuộc vào mặt bằng lãi suất của Cục Dự trữ Liên bang (FED).'
    ],
    onChainMetrics: 'TVL tăng trưởng ổn định 12% mỗi tháng trong suốt 6 tháng qua.',
    author: 'Hoàng Minh Thiên'
  },
  {
    id: 'proj-4',
    title: 'Cổ Phiếu Ngành Điện & Năng Lượng Tái Tạo: Báo Cáo Tài Chính Q4/2025',
    category: 'chung-khoan',
    categoryLabel: 'Chứng Khoán',
    thumbnail: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    verdict: 'An Toàn & Bền Vững',
    verdictColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    riskReward: 'Định giá P/E: 11.2x',
    rating: 4.6,
    date: '12/12/2025',
    summary: 'Báo cáo chuyên sâu doanh nghiệp điện đầu ngành. Đánh giá triển vọng hưởng lợi từ Quy hoạch điện VIII và dòng vốn FDI đổ vào khu công nghiệp.',
    tokenomics: 'Tỷ lệ cổ tức tiền mặt đều đặn 12-15%/năm. Biên lợi nhuận gộp cải thiện nhờ chi phí nguyên liệu đầu vào giảm.',
    highlights: [
      'Nhu cầu tiêu thụ điện sản xuất công nghiệp dự báo tăng 9.5%/năm.',
      'Cơ cấu nợ vay giảm mạnh, dòng tiền từ hoạt động kinh doanh dương lớn.',
      'Cổ tức ổn định thích hợp cho danh mục đầu tư tích sản dài hạn.'
    ],
    risks: [
      'Thời tiết thất thường ảnh hưởng đến sản lượng thủy điện.',
      'Chính sách giá điện quy định bởi cơ quan quản lý nhà nước.'
    ],
    onChainMetrics: 'Khối lượng giao dịch khớp lệnh bình quân 2.5 triệu cổ phiếu/phiên.',
    author: 'Hoàng Minh Thiên'
  },
  {
    id: 'proj-5',
    title: 'Sui Network (SUI): Kiến Trúc Move Language & Sức Mạnh Thúc Đẩy GameFi',
    category: 'layer-1-2',
    categoryLabel: 'Crypto Layer 1/2',
    thumbnail: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=800&q=80',
    verdict: 'Tiềm Năng Cao',
    verdictColor: 'bg-blue-100 text-blue-700 border-blue-200',
    riskReward: 'Tỷ lệ R/R: 1:3',
    rating: 4.8,
    date: '08/12/2025',
    summary: 'Sui Blockchain có tốc độ xử lý hàng trăm ngàn TPS nhờ thiết kế Object-centric. Review trải nghiệm người dùng và hệ sinh thái DEX/Lending.',
    tokenomics: 'Tổng cung 10 Tỷ SUI. Đã trả dần cho Ecosystem, Community và Early Investors.',
    highlights: [
      'Giao dịch gần như tức thì (Sub-second finality).',
      'Đội ngũ sáng lập Mysten Labs xuất thân từ dự án Diem (Meta/Facebook).',
      'Hệ sinh thái GameFi và Web3 Gaming cực kỳ sôi động.'
    ],
    risks: [
      'Sự cạnh tranh khốc liệt từ Aptos, Solana và Monad.',
      'Cần thêm thời gian để mở rộng tập người dùng thực sự ngoài thị trường Crypto.'
    ],
    onChainMetrics: 'Khối lượng DEX Volume hàng tuần vượt mốc 1.8 Tỷ USD.',
    author: 'Hoàng Minh Thiên'
  },
  {
    id: 'proj-6',
    title: 'Hướng Dẫn Trải Nghiệm & Cảnh Báo Rủi Ro Săn Airdrop L2 Testnet',
    category: 'airdrop-retro',
    categoryLabel: 'Airdrop & Retroactive',
    thumbnail: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80',
    verdict: 'Cảnh Báo Rủi Ro',
    verdictColor: 'bg-amber-100 text-amber-800 border-amber-200',
    riskReward: 'Chi phí thấp - Tỷ lệ nhận Airdrop 30%',
    rating: 4.5,
    date: '01/12/2025',
    summary: 'Phân tích xu hướng săn retroactive năm 2026. Lọc danh sách dự án uy tín, chống Sybil attack và tuyệt đối tránh click vào link scam.',
    tokenomics: 'Phân bổ 5-10% tổng cung token dự kiến dành cho cộng đồng sớm.',
    highlights: [
      'Chi phí vốn đầu tư cực nhỏ (chủ yếu là phí gas Testnet/Mainnet).',
      'Cơ hội nhận retroactive từ 500 - 5.000 USD nếu làm đúng chuẩn Sybil filter.'
    ],
    risks: [
      'Rủi ro lộ key/ví nếu truy cập nhầm website lừa đảo.',
      'Dự án hoãn ra mắt token hoặc thay đổi tiêu chí phút chót.'
    ],
    onChainMetrics: 'Tỷ lệ ví hợp lệ đạt tiêu chuẩn phân bổ thường chiếm dưới 15%.',
    author: 'Hoàng Minh Thiên'
  }
];
