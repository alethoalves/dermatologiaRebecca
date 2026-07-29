'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button/Button';
import ImageUploader from '@/components/admin/ImageUploader/ImageUploader';
import RichTextEditor from '@/components/admin/RichTextEditor/RichTextEditor';
import { slugify } from '@/lib/slugify';
import styles from './PostForm.module.scss';

export default function PostForm({ post }) {
  const router = useRouter();
  const isEditing = !!post;

  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [coverImageUrl, setCoverImageUrl] = useState(post?.coverImageUrl || null);
  const [contentHtml, setContentHtml] = useState(post?.contentHtml || '');
  const [seoDescription, setSeoDescription] = useState(post?.seoDescription || '');
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  function handleTitleChange(value) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function handleSave(status) {
    setError(null);

    if (!title.trim()) {
      setError('Informe um título para o post.');
      return;
    }
    if (!contentHtml || contentHtml === '<p></p>') {
      setError('Escreva o conteúdo do post antes de salvar.');
      return;
    }

    setIsSaving(true);
    const payload = { title, slug, excerpt, coverImageUrl, contentHtml, seoDescription, status };

    try {
      const res = await fetch(isEditing ? `/api/admin/posts/${post.id}` : '/api/admin/posts', {
        method: isEditing ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha ao salvar o post');

      router.push('/admin/posts');
      router.refresh();
    } catch (err) {
      setError(err.message);
      setIsSaving(false);
    }
  }

  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <h1 className={styles.title}>{isEditing ? 'Editar post' : 'Novo post'}</h1>
        <div className={styles.actions}>
          <Button variant="outline" disabled={isSaving} onClick={() => handleSave('DRAFT')}>
            Salvar rascunho
          </Button>
          <Button disabled={isSaving} onClick={() => handleSave('PUBLISHED')}>
            {isSaving ? 'Salvando…' : 'Publicar'}
          </Button>
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="title">
          Título
        </label>
        <input
          id="title"
          className={styles.input}
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Título do post"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="slug">
          Slug (URL)
        </label>
        <input
          id="slug"
          className={styles.input}
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugTouched(true);
          }}
          placeholder="slug-do-post"
        />
        <span className={styles.hint}>/blog/{slug || 'slug-do-post'}</span>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="excerpt">
          Resumo
        </label>
        <textarea
          id="excerpt"
          className={styles.textarea}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Um resumo curto, exibido nos cards e na listagem do blog"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Imagem de capa</label>
        <ImageUploader value={coverImageUrl} onChange={setCoverImageUrl} />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Conteúdo</label>
        <RichTextEditor content={contentHtml} onChange={setContentHtml} />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="seoDescription">
          Descrição para SEO (opcional)
        </label>
        <textarea
          id="seoDescription"
          className={styles.textarea}
          value={seoDescription}
          onChange={(e) => setSeoDescription(e.target.value)}
          placeholder="Descrição usada em mecanismos de busca e compartilhamentos"
        />
      </div>
    </div>
  );
}
