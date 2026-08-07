'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button/Button';
import ImageUploader from '@/components/admin/ImageUploader/ImageUploader';
import { slugify } from '@/lib/slugify';
import styles from './TreatmentForm.module.scss';

export default function TreatmentForm({ categories, treatment }) {
  const router = useRouter();
  const isEditing = !!treatment;

  const [categoryId, setCategoryId] = useState(treatment?.categoryId || categories[0]?.id || '');
  const [title, setTitle] = useState(treatment?.title || '');
  const [slug, setSlug] = useState(treatment?.slug || '');
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [description, setDescription] = useState(treatment?.description || '');
  const [imageUrl, setImageUrl] = useState(treatment?.imageUrl || null);
  const [imageAlt, setImageAlt] = useState(treatment?.imageAlt || '');
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  function handleTitleChange(value) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function handleSave() {
    setError(null);

    if (!categoryId) {
      setError('Selecione uma categoria para o tratamento.');
      return;
    }
    if (!title.trim()) {
      setError('Informe um título para o tratamento.');
      return;
    }
    if (!description.trim()) {
      setError('Informe uma descrição para o tratamento.');
      return;
    }

    setIsSaving(true);
    const payload = { categoryId, title, slug, description, imageUrl, imageAlt };

    try {
      const res = await fetch(isEditing ? `/api/admin/treatments/${treatment.id}` : '/api/admin/treatments', {
        method: isEditing ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha ao salvar o tratamento');

      router.push('/admin/treatments');
      router.refresh();
    } catch (err) {
      setError(err.message);
      setIsSaving(false);
    }
  }

  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <h1 className={styles.title}>{isEditing ? 'Editar tratamento' : 'Novo tratamento'}</h1>
        <div className={styles.actions}>
          <Button disabled={isSaving} onClick={handleSave}>
            {isSaving ? 'Salvando…' : 'Salvar'}
          </Button>
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="categoryId">
          Categoria
        </label>
        <select
          id="categoryId"
          className={styles.input}
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="title">
          Título do tratamento
        </label>
        <input
          id="title"
          className={styles.input}
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Ex.: Aplicação de Toxina Botulínica"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="slug">
          Slug
        </label>
        <input
          id="slug"
          className={styles.input}
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugTouched(true);
          }}
          placeholder="slug-do-tratamento"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="description">
          Descrição
        </label>
        <textarea
          id="description"
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descreva o tratamento"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Foto (opcional)</label>
        <ImageUploader value={imageUrl} onChange={setImageUrl} folder="treatments" alt={imageAlt || title} />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="imageAlt">
          Texto alternativo da foto
        </label>
        <input
          id="imageAlt"
          className={styles.input}
          value={imageAlt}
          onChange={(e) => setImageAlt(e.target.value)}
          placeholder="Descrição da imagem para acessibilidade"
        />
      </div>
    </div>
  );
}
