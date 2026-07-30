'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ImagePlus, X } from 'lucide-react';
import styles from './ImageUploader.module.scss';

export default function ImageUploader({ value, onChange }) {
  const inputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setError(null);
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha ao enviar imagem');
      onChange(data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className={styles.wrap}>
      {value ? (
        <div className={styles.preview}>
          <Image src={value} alt="Capa do post" fill sizes="400px" style={{ objectFit: 'cover' }} />
          <button type="button" className={styles.removeButton} onClick={() => onChange(null)} aria-label="Remover imagem">
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>
      ) : (
        <button type="button" className={styles.dropzone} onClick={() => inputRef.current?.click()} disabled={isUploading}>
          <ImagePlus size={22} strokeWidth={1.5} />
          {isUploading ? 'Enviando…' : 'Clique para enviar a imagem de capa (JPG, PNG ou WEBP, até 15MB)'}
        </button>
      )}

      {error && <span className={styles.error}>{error}</span>}

      <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={handleFileChange} />
    </div>
  );
}
