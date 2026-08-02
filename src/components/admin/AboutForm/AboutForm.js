'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button/Button';
import ImageUploader from '@/components/admin/ImageUploader/ImageUploader';
import CredentialsManager from '@/components/admin/CredentialsManager/CredentialsManager';
import styles from './AboutForm.module.scss';

export default function AboutForm({ about, credentials }) {
  const router = useRouter();

  const [kicker, setKicker] = useState(about?.kicker || '');
  const [name, setName] = useState(about?.name || '');
  const [intro, setIntro] = useState(about?.intro || '');
  const [paragraphs, setParagraphs] = useState(about?.paragraphs || '');
  const [photoUrl, setPhotoUrl] = useState(about?.photoUrl || null);
  const [photoAlt, setPhotoAlt] = useState(about?.photoAlt || '');
  const [crm, setCrm] = useState(about?.crm || '');
  const [rqe, setRqe] = useState(about?.rqe || '');
  const [instagramUrl, setInstagramUrl] = useState(about?.instagramUrl || '');
  const [instagramLabel, setInstagramLabel] = useState(about?.instagramLabel || '');
  const [lattesUrl, setLattesUrl] = useState(about?.lattesUrl || '');
  const [lattesLabel, setLattesLabel] = useState(about?.lattesLabel || '');
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setError(null);
    setSaved(false);

    if (!name.trim()) {
      setError('Informe o nome exibido na seção.');
      return;
    }
    if (!intro.trim()) {
      setError('Escreva o parágrafo de introdução.');
      return;
    }

    setIsSaving(true);
    const payload = {
      kicker,
      name,
      intro,
      paragraphs,
      photoUrl,
      photoAlt,
      crm,
      rqe,
      instagramUrl,
      instagramLabel,
      lattesUrl,
      lattesLabel,
    };

    try {
      const res = await fetch('/api/admin/about', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha ao salvar a seção Sobre');

      setSaved(true);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <h1 className={styles.title}>Sobre</h1>
        <div className={styles.actions}>
          <Button disabled={isSaving} onClick={handleSave}>
            {isSaving ? 'Salvando…' : 'Salvar alterações'}
          </Button>
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}
      {saved && !error && <p className={styles.success}>Alterações salvas.</p>}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="kicker">
          Kicker
        </label>
        <input
          id="kicker"
          className={styles.input}
          value={kicker}
          onChange={(e) => setKicker(e.target.value)}
          placeholder="Sobre a"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="name">
          Nome
        </label>
        <input
          id="name"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Dra. Rebecca Amorim"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Foto</label>
        <ImageUploader value={photoUrl} onChange={setPhotoUrl} folder="about" label="Clique para enviar a foto (JPG, PNG ou WEBP, até 15MB)" />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="photoAlt">
          Texto alternativo da foto
        </label>
        <input
          id="photoAlt"
          className={styles.input}
          value={photoAlt}
          onChange={(e) => setPhotoAlt(e.target.value)}
          placeholder="Dra. Rebecca Amorim no consultório"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="intro">
          Parágrafo de introdução
        </label>
        <textarea
          id="intro"
          className={styles.textarea}
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          placeholder="Olá, muito prazer!..."
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="paragraphs">
          Demais parágrafos
        </label>
        <textarea
          id="paragraphs"
          className={styles.textareaLarge}
          value={paragraphs}
          onChange={(e) => setParagraphs(e.target.value)}
          placeholder="Escreva cada parágrafo separado por uma linha em branco"
        />
        <span className={styles.hint}>Separe cada parágrafo com uma linha em branco.</span>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Credenciais</label>
        <CredentialsManager credentials={credentials} />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="crm">
          CRM
        </label>
        <input id="crm" className={styles.input} value={crm} onChange={(e) => setCrm(e.target.value)} placeholder="CRM-SP 123456" />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="rqe">
          RQE
        </label>
        <input id="rqe" className={styles.input} value={rqe} onChange={(e) => setRqe(e.target.value)} placeholder="RQE 12345" />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="instagramUrl">
          Instagram
        </label>
        <input
          id="instagramUrl"
          className={styles.input}
          value={instagramUrl}
          onChange={(e) => setInstagramUrl(e.target.value)}
          placeholder="https://instagram.com/..."
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="instagramLabel">
          Texto do botão do Instagram
        </label>
        <input
          id="instagramLabel"
          className={styles.input}
          value={instagramLabel}
          onChange={(e) => setInstagramLabel(e.target.value)}
          placeholder="Conheça meu perfil"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="lattesUrl">
          Currículo Lattes
        </label>
        <input
          id="lattesUrl"
          className={styles.input}
          value={lattesUrl}
          onChange={(e) => setLattesUrl(e.target.value)}
          placeholder="http://lattes.cnpq.br/..."
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="lattesLabel">
          Texto do botão do Lattes
        </label>
        <input
          id="lattesLabel"
          className={styles.input}
          value={lattesLabel}
          onChange={(e) => setLattesLabel(e.target.value)}
          placeholder="Conheça meu perfil"
        />
      </div>
    </div>
  );
}
