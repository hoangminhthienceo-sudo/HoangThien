import React, { useCallback, useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold,
  Italic,
  Strikethrough,
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
} from 'lucide-react';

interface RichTextEditorProps {
  /** Nội dung HTML — cùng định dạng WordPress lưu trong post_content */
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
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
    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
      active
        ? 'bg-[#2563EB] text-white'
        : 'text-slate-600 hover:bg-[#F0F7FF] hover:text-[#2563EB]'
    }`}
  >
    {children}
  </button>
);

/** Trình soạn thảo WYSIWYG — xuất ra HTML để lưu thẳng vào bài viết WordPress */
export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Nhập nội dung bài viết…',
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      }),
      Image.configure({ HTMLAttributes: { class: 'rounded-xl' } }),
      Placeholder.configure({ placeholder }),
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

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('Dán URL ảnh (có thể lấy từ Thư viện WordPress):');
    if (url?.trim()) {
      editor.chain().focus().setImage({ src: url.trim() }).run();
    }
  }, [editor]);

  if (!editor) {
    return (
      <div className="border border-[#E0F2FE] rounded-xl bg-white min-h-[380px] animate-pulse" />
    );
  }

  return (
    <div className="border border-[#E0F2FE] rounded-xl bg-white overflow-hidden focus-within:border-[#2563EB] transition-colors">
      {/* Thanh công cụ */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-[#E0F2FE] bg-[#F8FBFF]">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          title="In đậm"
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          title="In nghiêng"
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
          title="Gạch ngang"
        >
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>

        <span className="w-px h-5 bg-[#E0F2FE] mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
          title="Tiêu đề lớn"
        >
          <Heading2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })}
          title="Tiêu đề nhỏ"
        >
          <Heading3 className="w-4 h-4" />
        </ToolbarButton>

        <span className="w-px h-5 bg-[#E0F2FE] mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          title="Danh sách gạch đầu dòng"
        >
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          title="Danh sách đánh số"
        >
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
          title="Trích dẫn"
        >
          <Quote className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive('codeBlock')}
          title="Khối mã"
        >
          <Code className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Đường kẻ ngang"
        >
          <Minus className="w-4 h-4" />
        </ToolbarButton>

        <span className="w-px h-5 bg-[#E0F2FE] mx-1" />

        <ToolbarButton onClick={setLink} active={editor.isActive('link')} title="Chèn link">
          <LinkIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive('link')}
          title="Bỏ link"
        >
          <Unlink className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={addImage} title="Chèn ảnh theo URL">
          <span className="text-[11px] font-bold">IMG</span>
        </ToolbarButton>

        <span className="flex-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Hoàn tác"
        >
          <Undo2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Làm lại"
        >
          <Redo2 className="w-4 h-4" />
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};
