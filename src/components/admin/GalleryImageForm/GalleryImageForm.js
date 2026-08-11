'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button/Button';
import ImageUploader from '@/components/admin/ImageUploader/ImageUploader';
import styles from './GalleryImageForm.module.scss';

export default function GalleryImageForm({ image }) {
  const router = useRouter();
  const isEditing = !!image;

  const [imageUrl, setImageUrl] = useState(image?.imageUrl || null);
  const [caption, setCaption] = useState(image?.caption || '');
  const [dimensions, setDimensions] = useState({ width: image?.width || null, height: image?.height || null });
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    setError(null);

    if (!imageUrl) {
      setError('Envie uma imagem.');
      return;
    }
    if (!caption.trim()) {
      setError('Informe a legenda da imagem.');
      return;
    }

    setIsSaving(true);
    const payload = { imageUrl, caption, width: dimensions.width, height: dimensions.height };

    try {
      const res = await fetch(isEditing ? `/api/admin/gallery-images/${image.id}` : '/api/admin/gallery-images', {
        method: isEditing ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha ao salvar a imagem');

      router.push('/admin/gallery');
      router.refresh();
    } catch (err) {
      setError(err.message);
      setIsSaving(false);
    }
  }

  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <h1 className={styles.title}>{isEditing ? 'Editar imagem' : 'Nova imagem'}</h1>
        <div className={styles.actions}>
          <Button disabled={isSaving} onClick={handleSave}>
            {isSaving ? 'Salvando…' : 'Salvar'}
          </Button>
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.field}>
        <label className={styles.label}>Foto</label>
        <ImageUploader
          value={imageUrl}
          onChange={setImageUrl}
          onMeta={setDimensions}
          folder="gallery"
          alt={caption || 'Imagem da galeria'}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="caption">
          Legenda
        </label>
        <input
          id="caption"
          className={styles.input}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Ex.: Consultório em São Paulo"
        />
        <span className={styles.hint}>Aparece abaixo da foto no carrossel do site. O texto alternativo (acessibilidade) é gerado automaticamente a partir dela.</span>
      </div>
    </div>
  );
}
