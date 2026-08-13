import React, { useCallback, useEffect, useRef, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Youtube from '@tiptap/extension-youtube';
import { TableKit } from '@tiptap/extension-table';
import {
  Bold,
  Italic,
  Strikethrough,
  Underline as UnderlineIcon,
  Highlighter,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Unlink,
  Undo2,
  Redo2,
  Minus,
  Table as TableIcon,
  ImagePlus,
  Youtube as YoutubeIcon,
  Loader2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Trash2,
  Columns3,
  Rows3,
} from 'lucide-react';
import { WPCredentials, uploadMedia } from '../lib/wordpressAdmin';

interface RichTextEditorProps {
  /** Nội dung HTML — cùng định dạng WordPress lưu trong post_content */
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  /** Cần để tải ảnh trong bài lên Thư viện WordPress */
  credentials?: WPCredentials | null;
  canUpload?: boolean;
}

interface ToolbarButtonProps {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  onClick,
  active = false,
  disabled = false,
  title,
  children,
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    aria-label={title}
    aria-pressed={active}
    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
      active ? 'bg-[#2563EB] text-white' : 'text-slate-600 hover:bg-[#F0F7FF] hover:text-[#2563EB]'
    }`}
  >
    {children}
  </button>
);

const Divider = () => <span className="w-px h-5 bg-[#E0F2FE] mx-1" />;

/** Trình soạn thảo WYSIWYG — xuất ra HTML để lưu thẳng vào bài viết WordPress */
export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Nhập nội dung bài viết…',
  credentials = null,
  canUpload = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: {
          openOnClick: false,
          autolink: true,
          HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
        },
      }),
      Image.configure({ HTMLAttributes: { class: 'rounded-xl' } }),
      Placeholder.configure({ placeholder }),
      Highlight.configure({ multicolor: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Youtube.configure({ controls: true, nocookie: true, width: 640, height: 360 }),
      TableKit.configure({ table: { resizable: true } }),
    ],
    content: value,
    onUpdate: ({ editor: instance }) => onChange(instance.getHTML()),
    editorProps: {
      attributes: {
        class:
          'prose-editor min-h-[320px] px-4 py-3 focus:outline-none text-sm text-slate-800 leading-relaxed',
      },
    },
  });

  // Đồng bộ khi chuyển sang bài khác (value đổi từ bên ngoài)
  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
    // Chỉ chạy khi đổi bài, không chạy theo từng ký tự người dùng gõ
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, value]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previous = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('Nhập đường dẫn (để trống để xoá link):', previous ?? 'https://');

    if (url === null) return;
    if (url.trim() === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url.trim() }).run();
  }, [editor]);

  const addYoutube = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('Dán đường dẫn video YouTube:');
    if (url?.trim()) {
      editor.commands.setYoutubeVideo({ src: url.trim() });
    }
  }, [editor]);

  /** Tải ảnh từ máy lên Thư viện WordPress rồi chèn vào đúng vị trí con trỏ */
  const handleImageUpload = useCallback(
    async (file: File) => {
      if (!editor || !credentials) return;
      setUploading(true);
      setUploadError(null);
      try {
        const media = await uploadMedia(credentials, file);
        editor.chain().focus().setImage({ src: media.url, alt: file.name }).run();
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : 'Tải ảnh thất bại');
      } finally {
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    },
    [editor, credentials]
  );

  const addImageByUrl = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('Dán đường dẫn ảnh:');
    if (url?.trim()) {
      editor.chain().focus().setImage({ src: url.trim() }).run();
    }
  }, [editor]);

  if (!editor) {
    return <div className="border border-[#E0F2FE] rounded-xl bg-white min-h-[380px] animate-pulse" />;
  }

  const inTable = editor.isActive('table');

  return (
    <div className="border border-[#E0F2FE] rounded-xl bg-white overflow-hidden focus-within:border-[#2563EB] transition-colors">

      {/* Thanh công cụ */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-[#E0F2FE] bg-[#F8FBFF]">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="In đậm">
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="In nghiêng">
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Gạch chân">
          <UnderlineIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Gạch ngang">
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive('highlight')} title="Tô nền chữ">
          <Highlighter className="w-4 h-4" />
        </ToolbarButton>

        <Divider />

        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Tiêu đề lớn">
          <Heading2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Tiêu đề nhỏ">
          <Heading3 className="w-4 h-4" />
        </ToolbarButton>

        <Divider />

        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Canh trái">
          <AlignLeft className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Canh giữa">
          <AlignCenter className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Canh phải">
          <AlignRight className="w-4 h-4" />
        </ToolbarButton>

        <Divider />

        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Danh sách gạch đầu dòng">
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Danh sách đánh số">
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Trích dẫn">
          <Quote className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Khối mã">
          <Code className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Đường kẻ ngang">
          <Minus className="w-4 h-4" />
        </ToolbarButton>

        <Divider />

        <ToolbarButton onClick={setLink} active={editor.isActive('link')} title="Chèn link">
          <LinkIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive('link')} title="Bỏ link">
          <Unlink className="w-4 h-4" />
        </ToolbarButton>

        <Divider />

        {/* Ảnh */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(file);
          }}
        />
        {canUpload && credentials ? (
          <ToolbarButton
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            title="Chèn ảnh từ máy"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
          </ToolbarButton>
        ) : (
          <ToolbarButton onClick={addImageByUrl} title="Chèn ảnh theo đường dẫn">
            <ImagePlus className="w-4 h-4" />
          </ToolbarButton>
        )}

        <ToolbarButton onClick={addYoutube} title="Nhúng video YouTube">
          <YoutubeIcon className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
          }
          active={inTable}
          title="Chèn bảng"
        >
          <TableIcon className="w-4 h-4" />
        </ToolbarButton>

        <span className="flex-1" />

        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Hoàn tác">
          <Undo2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Làm lại">
          <Redo2 className="w-4 h-4" />
        </ToolbarButton>
      </div>

      {/* Hàng công cụ bảng — chỉ hiện khi con trỏ đang ở trong bảng */}
      {inTable && (
        <div className="flex flex-wrap items-center gap-1.5 px-3 py-2 border-b border-[#E0F2FE] bg-[#EEF5FF] text-[11px] font-bold text-slate-600">
          <span className="inline-flex items-center gap-1 mr-1 text-[#2563EB]">
            <TableIcon className="w-3.5 h-3.5" />
            Bảng
          </span>

          <button type="button" onClick={() => editor.chain().focus().addColumnAfter().run()} className="px-2 py-1 rounded bg-white border border-[#E0F2FE] hover:border-[#2563EB] hover:text-[#2563EB] inline-flex items-center gap-1">
            <Columns3 className="w-3 h-3" /> Thêm cột
          </button>
          <button type="button" onClick={() => editor.chain().focus().deleteColumn().run()} className="px-2 py-1 rounded bg-white border border-[#E0F2FE] hover:border-red-300 hover:text-red-600">
            Xoá cột
          </button>

          <button type="button" onClick={() => editor.chain().focus().addRowAfter().run()} className="px-2 py-1 rounded bg-white border border-[#E0F2FE] hover:border-[#2563EB] hover:text-[#2563EB] inline-flex items-center gap-1">
            <Rows3 className="w-3 h-3" /> Thêm hàng
          </button>
          <button type="button" onClick={() => editor.chain().focus().deleteRow().run()} className="px-2 py-1 rounded bg-white border border-[#E0F2FE] hover:border-red-300 hover:text-red-600">
            Xoá hàng
          </button>

          <button type="button" onClick={() => editor.chain().focus().toggleHeaderRow().run()} className="px-2 py-1 rounded bg-white border border-[#E0F2FE] hover:border-[#2563EB] hover:text-[#2563EB]">
            Bật/tắt hàng tiêu đề
          </button>
          <button type="button" onClick={() => editor.chain().focus().mergeOrSplit().run()} className="px-2 py-1 rounded bg-white border border-[#E0F2FE] hover:border-[#2563EB] hover:text-[#2563EB]">
            Gộp/tách ô
          </button>

          <button type="button" onClick={() => editor.chain().focus().deleteTable().run()} className="ml-auto px-2 py-1 rounded bg-white border border-red-200 text-red-600 hover:bg-red-50 inline-flex items-center gap-1">
            <Trash2 className="w-3 h-3" /> Xoá bảng
          </button>
        </div>
      )}

      {uploadError && (
        <p className="px-4 py-2 text-[11px] text-red-600 bg-red-50 border-b border-red-100">{uploadError}</p>
      )}

      <EditorContent editor={editor} />
    </div>
  );
};
