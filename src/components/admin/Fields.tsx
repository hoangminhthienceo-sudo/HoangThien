import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface FieldProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
}

export const Field: React.FC<FieldProps> = ({ label, hint, children }) => (
  <label className="block">
    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{label}</span>
    {hint && <span className="block text-[11px] text-slate-500 mt-0.5 normal-case">{hint}</span>}
    <div className="mt-1.5">{children}</div>
  </label>
);

const inputClass =
  'w-full px-3.5 py-2.5 bg-white border border-[#E0F2FE] rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#2563EB] transition-colors';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  placeholder?: string;
  type?: 'text' | 'url' | 'email' | 'number' | 'password';
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  hint,
  placeholder,
  type = 'text',
}) => (
  <Field label={label} hint={hint}>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={inputClass}
    />
  </Field>
);

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  rows?: number;
  placeholder?: string;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  value,
  onChange,
  hint,
  rows = 4,
  placeholder,
}) => (
  <Field label={label} hint={hint}>
    <textarea
      value={value}
      rows={rows}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputClass} leading-relaxed resize-y`}
    />
  </Field>
);

interface ParagraphListFieldProps {
  label: string;
  hint?: string;
  value: string[];
  onChange: (value: string[]) => void;
  addLabel?: string;
  rows?: number;
}

/** Danh sách đoạn văn — thêm / xoá / sửa từng đoạn */
export const ParagraphListField: React.FC<ParagraphListFieldProps> = ({
  label,
  hint,
  value,
  onChange,
  addLabel = 'Thêm đoạn',
  rows = 3,
}) => {
  const update = (index: number, text: string) =>
    onChange(value.map((item, i) => (i === index ? text : item)));

  return (
    <Field label={label} hint={hint}>
      <div className="space-y-2">
        {value.map((paragraph, index) => (
          <div key={index} className="flex items-start gap-2">
            <textarea
              value={paragraph}
              rows={rows}
              onChange={(e) => update(index, e.target.value)}
              className={`${inputClass} leading-relaxed resize-y`}
            />
            <button
              type="button"
              onClick={() => onChange(value.filter((_, i) => i !== index))}
              title="Xoá đoạn này"
              aria-label="Xoá đoạn này"
              className="mt-1 shrink-0 w-9 h-9 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...value, ''])}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          {addLabel}
        </button>
      </div>
    </Field>
  );
};

interface RepeaterProps<T> {
  label: string;
  hint?: string;
  items: T[];
  onChange: (items: T[]) => void;
  makeEmpty: () => T;
  addLabel: string;
  renderItem: (item: T, update: (patch: Partial<T>) => void, index: number) => React.ReactNode;
}

/** Khối lặp dùng chung cho Thành tựu / Trụ cột / Cột mốc */
export function Repeater<T>({
  label,
  hint,
  items,
  onChange,
  makeEmpty,
  addLabel,
  renderItem,
}: RepeaterProps<T>) {
  const update = (index: number, patch: Partial<T>) =>
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));

  return (
    <Field label={label} hint={hint}>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative p-3.5 pr-12 rounded-xl bg-[#F8FBFF] border border-[#E0F2FE] space-y-2.5"
          >
            {renderItem(item, (patch) => update(index, patch), index)}
            <button
              type="button"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
              title="Xoá mục này"
              aria-label="Xoá mục này"
              className="absolute top-3 right-3 w-8 h-8 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...items, makeEmpty()])}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          {addLabel}
        </button>
      </div>
    </Field>
  );
}

/** Ô nhập gọn dùng bên trong Repeater */
export const InlineInput: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}> = ({ label, value, onChange, placeholder }) => (
  <label className="block">
    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{label}</span>
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 w-full px-3 py-2 bg-white border border-[#E0F2FE] rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#2563EB]"
    />
  </label>
);

export const InlineTextArea: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}> = ({ label, value, onChange, rows = 2 }) => (
  <label className="block">
    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{label}</span>
    <textarea
      value={value}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 w-full px-3 py-2 bg-white border border-[#E0F2FE] rounded-lg text-sm text-slate-900 leading-relaxed focus:outline-none focus:border-[#2563EB] resize-y"
    />
  </label>
);
