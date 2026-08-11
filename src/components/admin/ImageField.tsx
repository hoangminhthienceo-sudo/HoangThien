import React, { useRef, useState } from 'react';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { WPCredentials, uploadMedia } from '../../lib/wordpressAdmin';

interface ImageFieldProps {
  value: string;
  onChange: (url: string) => void;
  credentials: WPCredentials | null;
  /** Cho phép tải ảnh lên (tài khoản phải có quyền upload_files) */
  canUpload: boolean;
  label?: string;
}

/**
 * Ô chọn ảnh: tải từ máy lên Thư viện WordPress, hoặc dán sẵn một đường dẫn ảnh.
 * Giá trị lưu lại luôn là URL, nên ảnh mặc định đi kèm mã nguồn vẫn dùng được.
 */
export const ImageField: React.FC<ImageFieldProps> = ({
  value,
  onChange,
  credentials,
  canUpload,
  label = 'Ảnh',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    if (!credentials) return;
    setUploading(true);
    setError(null);
    try {
      const media = await uploadMedia(credentials, file);
      onChange(media.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Tải ảnh thất bại');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div>
      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{label}</span>

      <div className="mt-1 flex gap-3">
        {/* Xem trước */}
        <div className="relative w-32 shrink-0 aspect-video rounded-lg overflow-hidden bg-[#F0F7FF] border border-[#E0F2FE]">
          {value ? (
            <>
              <img src={value} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => onChange('')}
                title="Bỏ ảnh"
                aria-label="Bỏ ảnh"
                className="absolute top-1 right-1 w-6 h-6 rounded bg-white/90 text-slate-600 hover:text-red-600 flex items-center justify-center shadow"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300">
              <ImagePlus className="w-5 h-5" />
            </div>
          )}
        </div>

        {/* Nút tải lên + ô dán link */}
        <div className="flex-1 min-w-0 space-y-2">
          {canUpload && (
            <>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload(file);
                }}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="w-full py-2 bg-[#F0F7FF] text-[#2563EB] border border-[#BFDBFE] rounded-lg text-xs font-bold hover:bg-[#E0F2FE] disabled:opacity-60 transition-colors inline-flex items-center justify-center gap-1.5"
              >
                {uploading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <ImagePlus className="w-3.5 h-3.5" />
                )}
                {uploading ? 'Đang tải lên…' : 'Tải ảnh từ máy'}
              </button>
            </>
          )}

          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="hoặc dán đường dẫn ảnh…"
            className="w-full px-3 py-2 bg-white border border-[#E0F2FE] rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#2563EB]"
          />

          {error && <p className="text-[11px] text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
};
