'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button/Button';
import { slugify } from '@/lib/slugify';
import styles from './FaqForm.module.scss';

export default function FaqForm({ faqItem }) {
  const router = useRouter();
  const isEditing = !!faqItem;

  const [question, setQuestion] = useState(faqItem?.question || '');
  const [slug, setSlug] = useState(faqItem?.slug || '');
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [answer, setAnswer] = useState(faqItem?.answer || '');
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  function handleQuestionChange(value) {
    setQuestion(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function handleSave() {
    setError(null);

    if (!question.trim()) {
      setError('Informe a pergunta.');
      return;
    }
    if (!answer.trim()) {
      setError('Informe a resposta.');
      return;
    }

    setIsSaving(true);
    const payload = { question, slug, answer };

    try {
      const res = await fetch(isEditing ? `/api/admin/faq/${faqItem.id}` : '/api/admin/faq', {
        method: isEditing ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha ao salvar a pergunta');

      router.push('/admin/faq');
      router.refresh();
    } catch (err) {
      setError(err.message);
      setIsSaving(false);
    }
  }

  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <h1 className={styles.title}>{isEditing ? 'Editar pergunta' : 'Nova pergunta'}</h1>
        <div className={styles.actions}>
          <Button disabled={isSaving} onClick={handleSave}>
            {isSaving ? 'Salvando…' : 'Salvar'}
          </Button>
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="question">
          Pergunta
        </label>
        <input
          id="question"
          className={styles.input}
          value={question}
          onChange={(e) => handleQuestionChange(e.target.value)}
          placeholder="Ex.: São aceitos planos de saúde?"
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
          placeholder="slug-da-pergunta"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="answer">
          Resposta
        </label>
        <textarea
          id="answer"
          className={styles.textarea}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Escreva a resposta"
        />
      </div>
    </div>
  );
}
