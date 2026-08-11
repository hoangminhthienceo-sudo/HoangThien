import React from 'react';
import { SiteSettings } from '../../data/siteSettings';
import { WPCredentials, WPPermissions } from '../../lib/wordpressAdmin';
import { ImageField } from './ImageField';
import {
  InlineInput,
  InlineTextArea,
  ParagraphListField,
  Repeater,
  TextAreaField,
  TextField,
} from './Fields';

interface ContentTabProps {
  settings: SiteSettings;
  onChange: (settings: SiteSettings) => void;
  credentials: WPCredentials | null;
  permissions: WPPermissions;
}

const Section: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({
  title,
  description,
  children,
}) => (
  <section className="bg-white rounded-2xl border border-[#E0F2FE] shadow-sm p-5 sm:p-6">
    <header className="mb-5 pb-4 border-b border-[#F0F7FF]">
      <h2 className="text-base font-extrabold text-slate-900">{title}</h2>
      <p className="text-xs text-slate-500 mt-0.5">{description}</p>
    </header>
    <div className="space-y-4">{children}</div>
  </section>
);

export const ContentTab: React.FC<ContentTabProps> = ({
  settings,
  onChange,
  credentials,
  permissions,
}) => {
  // Cập nhật một nhánh của settings mà không đụng các nhánh khác
  const patch = <K extends keyof SiteSettings>(key: K, value: Partial<SiteSettings[K]>) =>
    onChange({ ...settings, [key]: { ...(settings[key] as object), ...value } as SiteSettings[K] });

  return (
    <div className="space-y-5">

      <Section
        title="Thương hiệu"
        description="Tên hiển thị ở logo trên header và footer"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Phần đầu tên"
            value={settings.brand.name}
            onChange={(name) => patch('brand', { name })}
            hint="Chữ màu đen, vd: HOANG"
          />
          <TextField
            label="Phần nhấn màu xanh"
            value={settings.brand.nameAccent}
            onChange={(nameAccent) => patch('brand', { nameAccent })}
            hint="Chữ màu xanh, vd: MINHTHIEN"
          />
        </div>
        <TextField
          label="Dòng mô tả dưới logo"
          value={settings.brand.tagline}
          onChange={(tagline) => patch('brand', { tagline })}
        />
      </Section>

      <Section
        title="Khối Hero (đầu trang chủ)"
        description="Tiêu đề lớn, mô tả và các nút bấm ở màn hình đầu tiên"
      >
        <TextField
          label="Nhãn nhỏ phía trên"
          value={settings.hero.badge}
          onChange={(badge) => patch('hero', { badge })}
        />

        <div className="p-4 rounded-xl bg-[#F8FBFF] border border-[#E0F2FE] space-y-3">
          <p className="text-[11px] text-slate-500">
            Tiêu đề lớn được ghép từ 3 phần: phần đầu + phần <strong>tô màu xanh gradient</strong> + phần cuối.
          </p>
          <InlineInput
            label="Phần đầu"
            value={settings.hero.titleLead}
            onChange={(titleLead) => patch('hero', { titleLead })}
          />
          <InlineInput
            label="Phần tô màu"
            value={settings.hero.titleHighlight}
            onChange={(titleHighlight) => patch('hero', { titleHighlight })}
          />
          <InlineInput
            label="Phần cuối"
            value={settings.hero.titleTail}
            onChange={(titleTail) => patch('hero', { titleTail })}
          />
        </div>

        <TextAreaField
          label="Đoạn mô tả"
          value={settings.hero.subtitle}
          onChange={(subtitle) => patch('hero', { subtitle })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Chữ trên nút chính"
            value={settings.hero.primaryCta}
            onChange={(primaryCta) => patch('hero', { primaryCta })}
          />
          <TextField
            label="Chữ trên nút phụ"
            value={settings.hero.secondaryCta}
            onChange={(secondaryCta) => patch('hero', { secondaryCta })}
          />
        </div>

        <TextField
          label="Nhãn phía trên dãy kênh MXH"
          value={settings.hero.channelsLabel}
          onChange={(channelsLabel) => patch('hero', { channelsLabel })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Chức danh trên ảnh"
            value={settings.hero.profileRole}
            onChange={(profileRole) => patch('hero', { profileRole })}
          />
          <TextField
            label="Tên trên ảnh"
            value={settings.hero.profileName}
            onChange={(profileName) => patch('hero', { profileName })}
          />
        </div>
        <TextField
          label="Dòng ghi chú trên ảnh"
          value={settings.hero.profileNote}
          onChange={(profileNote) => patch('hero', { profileNote })}
        />
      </Section>

      <Section
        title="Câu Chuyện Làm Nghề (trang chủ)"
        description="Khối giới thiệu ngắn ở trang chủ, bấm vào sẽ sang trang Giới Thiệu"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Nhãn nhỏ"
            value={settings.homeAbout.eyebrow}
            onChange={(eyebrow) => patch('homeAbout', { eyebrow })}
          />
          <TextField
            label="Chữ trên nút xem chi tiết"
            value={settings.homeAbout.ctaLabel}
            onChange={(ctaLabel) => patch('homeAbout', { ctaLabel })}
          />
        </div>
        <TextField
          label="Tiêu đề"
          value={settings.homeAbout.title}
          onChange={(title) => patch('homeAbout', { title })}
        />
        <TextField
          label="Câu trích dẫn"
          value={settings.homeAbout.quote}
          onChange={(quote) => patch('homeAbout', { quote })}
        />
        <ParagraphListField
          label="Các đoạn nội dung"
          value={settings.homeAbout.paragraphs}
          onChange={(paragraphs) => patch('homeAbout', { paragraphs })}
        />

        <Repeater
          label="2 ô điểm mạnh"
          hint="Hiển thị dạng 2 ô nhỏ bên dưới nội dung"
          items={settings.homeAbout.pillars}
          onChange={(pillars) => patch('homeAbout', { pillars })}
          makeEmpty={() => ({ title: '', description: '' })}
          addLabel="Thêm ô"
          renderItem={(pillar, update) => (
            <>
              <InlineInput label="Tiêu đề" value={pillar.title} onChange={(title) => update({ title })} />
              <InlineTextArea
                label="Mô tả"
                value={pillar.description}
                onChange={(description) => update({ description })}
              />
            </>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Tiêu đề thư viện ảnh"
            value={settings.homeAbout.galleryTitle}
            onChange={(galleryTitle) => patch('homeAbout', { galleryTitle })}
          />
          <TextField
            label="Chữ trên nút sang trang Giới Thiệu"
            value={settings.homeAbout.galleryCtaLabel}
            onChange={(galleryCtaLabel) => patch('homeAbout', { galleryCtaLabel })}
          />
        </div>
        <TextField
          label="Mô tả thư viện ảnh"
          value={settings.homeAbout.gallerySubtitle}
          onChange={(gallerySubtitle) => patch('homeAbout', { gallerySubtitle })}
        />
      </Section>

      <Section
        title="Hình ảnh sự kiện & hội thảo"
        description="Thư viện ảnh hiển thị ở cuối khối Câu Chuyện Làm Nghề (trang chủ) và trang Giới Thiệu"
      >
        <Repeater
          label="Danh sách ảnh"
          hint="Ảnh ngang tỉ lệ 16:9, tối thiểu 800px chiều ngang. Nên để 4 ảnh cho vừa một hàng."
          items={settings.gallery}
          onChange={(gallery) => onChange({ ...settings, gallery })}
          makeEmpty={() => ({ image: '', title: '', caption: '' })}
          addLabel="Thêm ảnh"
          renderItem={(item, update) => (
            <>
              <ImageField
                value={item.image}
                onChange={(image) => update({ image })}
                credentials={credentials}
                canUpload={permissions.canUploadFiles}
              />
              <InlineInput
                label="Tiêu đề ảnh"
                value={item.title}
                onChange={(title) => update({ title })}
                placeholder="vd: Diễn Thuyết Tại Workshop Tài Chính"
              />
              <InlineInput
                label="Chú thích"
                value={item.caption}
                onChange={(caption) => update({ caption })}
                placeholder="vd: Chia sẻ góc nhìn kinh tế vĩ mô"
              />
            </>
          )}
        />
      </Section>

      <Section
        title="4 ô thành tựu"
        description="Dãy số liệu hiển thị ở trang chủ và trang Giới Thiệu"
      >
        <Repeater
          label="Danh sách thành tựu"
          items={settings.achievements}
          onChange={(achievements) => onChange({ ...settings, achievements })}
          makeEmpty={() => ({ value: '', label: '' })}
          addLabel="Thêm thành tựu"
          renderItem={(item, update) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <InlineInput
                label="Con số"
                value={item.value}
                onChange={(value) => update({ value })}
                placeholder="vd: +1.000"
              />
              <InlineInput
                label="Nhãn"
                value={item.label}
                onChange={(label) => update({ label })}
                placeholder="vd: Khách hàng & Học viên"
              />
            </div>
          )}
        />
      </Section>

      <Section
        title="Tiêu đề các khối còn lại (trang chủ)"
        description="Phần Sức ảnh hưởng Media, Khoá học và Review dự án"
      >
        {([
          { key: 'mediaProof' as const, name: 'Sức Ảnh Hưởng Media', hasCta: false },
          { key: 'coursesPreview' as const, name: 'Khoá Học', hasCta: true },
          { key: 'projectsPreview' as const, name: 'Review Dự Án', hasCta: true },
        ]).map(({ key, name, hasCta }) => {
          const block = settings[key];
          return (
            <div key={key} className="p-4 rounded-xl bg-[#F8FBFF] border border-[#E0F2FE] space-y-2.5">
              <p className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider">{name}</p>
              <InlineInput
                label="Nhãn nhỏ"
                value={block.eyebrow}
                onChange={(eyebrow) => patch(key, { eyebrow } as never)}
              />
              <InlineInput
                label="Tiêu đề"
                value={block.title}
                onChange={(title) => patch(key, { title } as never)}
              />
              <InlineTextArea
                label="Mô tả"
                value={block.subtitle}
                onChange={(subtitle) => patch(key, { subtitle } as never)}
              />
              {hasCta && 'ctaLabel' in block && (
                <InlineInput
                  label="Chữ trên nút xem tất cả"
                  value={block.ctaLabel}
                  onChange={(ctaLabel) => patch(key, { ctaLabel } as never)}
                />
              )}
            </div>
          );
        })}
      </Section>

      <Section
        title="Trang Giới Thiệu"
        description="Nội dung đầy đủ của trang Giới Thiệu"
      >
        <TextField
          label="Tiêu đề trang"
          value={settings.aboutPage.title}
          onChange={(title) => patch('aboutPage', { title })}
        />
        <TextAreaField
          label="Đoạn mở đầu"
          value={settings.aboutPage.intro}
          onChange={(intro) => patch('aboutPage', { intro })}
          rows={5}
        />
        <TextField
          label="Câu trích dẫn"
          value={settings.aboutPage.quote}
          onChange={(quote) => patch('aboutPage', { quote })}
        />
        <ParagraphListField
          label="Các đoạn nội dung chính"
          value={settings.aboutPage.paragraphs}
          onChange={(paragraphs) => patch('aboutPage', { paragraphs })}
          rows={4}
        />

        <Repeater
          label="Các ô trụ cột bên phải"
          items={settings.aboutPage.pillars}
          onChange={(pillars) => patch('aboutPage', { pillars })}
          makeEmpty={() => ({ title: '', description: '' })}
          addLabel="Thêm trụ cột"
          renderItem={(pillar, update) => (
            <>
              <InlineInput label="Tiêu đề" value={pillar.title} onChange={(title) => update({ title })} />
              <InlineTextArea
                label="Mô tả"
                value={pillar.description}
                onChange={(description) => update({ description })}
                rows={3}
              />
            </>
          )}
        />

        <TextField
          label="Tiêu đề khối cột mốc"
          value={settings.aboutPage.milestonesTitle}
          onChange={(milestonesTitle) => patch('aboutPage', { milestonesTitle })}
        />
        <Repeater
          label="Cột mốc hành trình"
          hint="Dòng thời gian hiển thị theo thứ tự từ trên xuống"
          items={settings.aboutPage.milestones}
          onChange={(milestones) => patch('aboutPage', { milestones })}
          makeEmpty={() => ({ year: '', title: '', description: '' })}
          addLabel="Thêm cột mốc"
          renderItem={(milestone, update) => (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <InlineInput
                  label="Mốc thời gian"
                  value={milestone.year}
                  onChange={(year) => update({ year })}
                  placeholder="vd: 2021 - 2023"
                />
                <InlineInput
                  label="Tiêu đề"
                  value={milestone.title}
                  onChange={(title) => update({ title })}
                />
              </div>
              <InlineTextArea
                label="Mô tả"
                value={milestone.description}
                onChange={(description) => update({ description })}
                rows={3}
              />
            </>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Tiêu đề thư viện ảnh"
            value={settings.aboutPage.galleryTitle}
            onChange={(galleryTitle) => patch('aboutPage', { galleryTitle })}
          />
          <TextField
            label="Mô tả thư viện ảnh"
            value={settings.aboutPage.gallerySubtitle}
            onChange={(gallerySubtitle) => patch('aboutPage', { gallerySubtitle })}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Tiêu đề khối kết"
            value={settings.aboutPage.closingTitle}
            onChange={(closingTitle) => patch('aboutPage', { closingTitle })}
          />
          <TextField
            label="Mô tả khối kết"
            value={settings.aboutPage.closingSubtitle}
            onChange={(closingSubtitle) => patch('aboutPage', { closingSubtitle })}
          />
        </div>
      </Section>

      <Section title="Footer" description="Nội dung chân trang">
        <TextAreaField
          label="Đoạn giới thiệu ngắn"
          value={settings.footer.description}
          onChange={(description) => patch('footer', { description })}
        />
        <div className="p-4 rounded-xl bg-[#F8FBFF] border border-[#E0F2FE] space-y-2.5">
          <p className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider">
            Banner Telegram trên cùng footer
          </p>
          <InlineInput
            label="Nhãn nhỏ"
            value={settings.footer.bannerEyebrow}
            onChange={(bannerEyebrow) => patch('footer', { bannerEyebrow })}
          />
          <InlineInput
            label="Tiêu đề"
            value={settings.footer.bannerTitle}
            onChange={(bannerTitle) => patch('footer', { bannerTitle })}
          />
          <InlineTextArea
            label="Mô tả"
            value={settings.footer.bannerSubtitle}
            onChange={(bannerSubtitle) => patch('footer', { bannerSubtitle })}
          />
        </div>
        <TextAreaField
          label="Miễn trừ trách nhiệm"
          value={settings.footer.disclaimer}
          onChange={(disclaimer) => patch('footer', { disclaimer })}
          rows={5}
        />
        <TextField
          label="Dòng bản quyền"
          value={settings.footer.copyright}
          onChange={(copyright) => patch('footer', { copyright })}
        />
      </Section>

    </div>
  );
};
