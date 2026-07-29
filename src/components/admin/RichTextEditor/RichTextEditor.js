'use client';

import { useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
} from 'lucide-react';
import styles from './RichTextEditor.module.scss';

function ToolButton({ onClick, active, disabled, label, icon: Icon }) {
  return (
    <button
      type="button"
      className={styles.toolButton}
      data-active={active ? 'true' : 'false'}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
    >
      <Icon size={16} strokeWidth={1.5} />
    </button>
  );
}

export default function RichTextEditor({ content, onChange }) {
  const fileInputRef = useRef(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ link: { openOnClick: false, autolink: true } }),
      Image,
      Placeholder.configure({ placeholder: 'Escreva o conteúdo do post…' }),
    ],
    content: content || '',
    onUpdate: ({ editor: currentEditor }) => onChange(currentEditor.getHTML()),
  });

  if (!editor) return null;

  function handleSetLink() {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL do link:', previousUrl || 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url }).run();
  }

  async function handleImageSelect(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha ao enviar imagem');
      editor.chain().focus().setImage({ src: data.url }).run();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <ToolButton icon={Bold} label="Negrito" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} />
        <ToolButton icon={Italic} label="Itálico" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} />
        <ToolButton
          icon={UnderlineIcon}
          label="Sublinhado"
          active={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
        <div className={styles.divider} />
        <ToolButton
          icon={Heading2}
          label="Título 2"
          active={editor.isActive('heading', { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        />
        <ToolButton
          icon={Heading3}
          label="Título 3"
          active={editor.isActive('heading', { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        />
        <div className={styles.divider} />
        <ToolButton icon={List} label="Lista" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} />
        <ToolButton
          icon={ListOrdered}
          label="Lista numerada"
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <ToolButton
          icon={Quote}
          label="Citação"
          active={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />
        <div className={styles.divider} />
        <ToolButton icon={LinkIcon} label="Link" active={editor.isActive('link')} onClick={handleSetLink} />
        <ToolButton icon={ImageIcon} label="Imagem" onClick={() => fileInputRef.current?.click()} />
        <div className={styles.divider} />
        <ToolButton icon={Undo} label="Desfazer" onClick={() => editor.chain().focus().undo().run()} />
        <ToolButton icon={Redo} label="Refazer" onClick={() => editor.chain().focus().redo().run()} />

        <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={handleImageSelect} />
      </div>

      <div className={styles.editorContent}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
