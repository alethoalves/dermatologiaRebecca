'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button/Button';
import { slugify } from '@/lib/slugify';
import styles from './TreatmentCategoryForm.module.scss';

export default function TreatmentCategoryForm({ category }) {
  const router = useRouter();
  const isEditing = !!category;

  const [label, setLabel] = useState(category?.label || '');
  const [slug, setSlug] = useState(category?.slug || '');
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  function handleLabelChange(value) {
    setLabel(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function handleSave() {
    setError(null);

    if (!label.trim()) {
      setError('Informe um nome para a categoria.');
      return;
    }

    setIsSaving(true);
    const payload = { label, slug };

    try {
      const res = await fetch(
        isEditing ? `/api/admin/treatment-categories/${category.id}` : '/api/admin/treatment-categories',
        {
          method: isEditing ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha ao salvar a categoria');

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
        <h1 className={styles.title}>{isEditing ? 'Editar categoria' : 'Nova categoria'}</h1>
        <div className={styles.actions}>
          <Button disabled={isSaving} onClick={handleSave}>
            {isSaving ? 'Salvando…' : 'Salvar'}
          </Button>
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="label">
          Nome da categoria
        </label>
        <input
          id="label"
          className={styles.input}
          value={label}
          onChange={(e) => handleLabelChange(e.target.value)}
          placeholder="Ex.: Dermatologia Estética"
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
          placeholder="slug-da-categoria"
        />
      </div>
    </div>
  );
}
