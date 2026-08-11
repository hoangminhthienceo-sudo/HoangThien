import React from 'react';
import { ExternalLink } from 'lucide-react';
import { SiteSettings } from '../../data/siteSettings';
import { SocialChannel } from '../../data/socialLinks';
import { TextField } from './Fields';

interface LinksTabProps {
  settings: SiteSettings;
  onChange: (settings: SiteSettings) => void;
}

export const LinksTab: React.FC<LinksTabProps> = ({ settings, onChange }) => {
  const updateChannel = (id: SocialChannel['id'], patch: Partial<SocialChannel>) =>
    onChange({
      ...settings,
      social: settings.social.map((channel) =>
        channel.id === id ? { ...channel, ...patch } : channel
      ),
    });

  const patchContact = (patch: Partial<SiteSettings['contact']>) =>
    onChange({ ...settings, contact: { ...settings.contact, ...patch } });

  return (
    <div className="space-y-5">

      <section className="bg-white rounded-2xl border border-[#E0F2FE] shadow-sm p-5 sm:p-6">
        <header className="mb-5 pb-4 border-b border-[#F0F7FF]">
          <h2 className="text-base font-extrabold text-slate-900">Kênh mạng xã hội</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Link và số liệu ở đây dùng chung cho dãy badge đầu trang, bảng chỉ số "Sự Tin Tưởng &amp;
            Kết Nối Từ Cộng Đồng" và các icon ở footer.
          </p>
        </header>

        <div className="space-y-4">
          {settings.social.map((channel) => (
            <div
              key={channel.id}
              className="p-4 rounded-xl bg-[#F8FBFF] border border-[#E0F2FE]"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-extrabold text-slate-900">{channel.label}</span>
                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2563EB] hover:underline"
                >
                  Mở thử <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Đường dẫn
                    </span>
                    <input
                      type="url"
                      value={channel.url}
                      onChange={(e) => updateChannel(channel.id, { url: e.target.value })}
                      className="mt-1 w-full px-3 py-2 bg-white border border-[#E0F2FE] rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#2563EB]"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Số người theo dõi
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={channel.followers}
                    onChange={(e) =>
                      updateChannel(channel.id, { followers: Number(e.target.value) || 0 })
                    }
                    className="mt-1 w-full px-3 py-2 bg-white border border-[#E0F2FE] rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#2563EB]"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <label className="block">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Tên hiển thị
                  </span>
                  <input
                    type="text"
                    value={channel.label}
                    onChange={(e) => updateChannel(channel.id, { label: e.target.value })}
                    className="mt-1 w-full px-3 py-2 bg-white border border-[#E0F2FE] rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#2563EB]"
                  />
                </label>
                <label className="block">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Nhãn dưới con số
                  </span>
                  <input
                    type="text"
                    value={channel.metricLabel}
                    onChange={(e) => updateChannel(channel.id, { metricLabel: e.target.value })}
                    className="mt-1 w-full px-3 py-2 bg-white border border-[#E0F2FE] rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#2563EB]"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-[#E0F2FE] shadow-sm p-5 sm:p-6">
        <header className="mb-5 pb-4 border-b border-[#F0F7FF]">
          <h2 className="text-base font-extrabold text-slate-900">Thông tin liên hệ</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Dùng ở footer và các nút "Tham Gia Telegram" trên toàn site
          </p>
        </header>

        <div className="space-y-4">
          <TextField
            label="Email"
            type="email"
            value={settings.contact.email}
            onChange={(email) => patchContact({ email })}
          />
          <TextField
            label="Tên tài khoản Telegram"
            value={settings.contact.telegramHandle}
            onChange={(telegramHandle) => patchContact({ telegramHandle })}
            hint="Chỉ là chữ hiển thị ở footer, vd: @hoangminhthien"
          />
          <TextField
            label="Link Telegram cá nhân"
            type="url"
            value={settings.contact.telegramUrl}
            onChange={(telegramUrl) => patchContact({ telegramUrl })}
            hint="Dùng cho nút Telegram ở header, hero và footer"
          />
          <TextField
            label="Link nhóm Telegram cộng đồng"
            type="url"
            value={settings.contact.telegramTeamUrl}
            onChange={(telegramTeamUrl) => patchContact({ telegramTeamUrl })}
          />
        </div>
      </section>

    </div>
  );
};
