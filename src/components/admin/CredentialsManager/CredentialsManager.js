'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import OrderControls from '@/components/admin/OrderControls/OrderControls';
import styles from './CredentialsManager.module.scss';

function CredentialRow({ credential, isFirst, isLast }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(credential.label);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  async function handleSave() {
    if (!label.trim()) return;
    setIsSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/credentials/${credential.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha ao salvar');
      setIsEditing(false);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`Excluir a credencial "${credential.label}"?`)) return;
    try {
      const res = await fetch(`/api/admin/credentials/${credential.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Falha ao excluir');
      router.refresh();
    } catch (err) {
      alert(err.message);
    }
  }

  function handleCancel() {
    setLabel(credential.label);
    setIsEditing(false);
    setError(null);
  }

  return (
    <li className={styles.row}>
      <OrderControls endpoint={`/api/admin/credentials/${credential.id}/move`} isFirst={isFirst} isLast={isLast} />

      {isEditing ? (
        <>
          <input
            className={styles.input}
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            disabled={isSaving}
            autoFocus
          />
          <div className={styles.actions}>
            <button type="button" className={styles.iconButton} onClick={handleSave} disabled={isSaving} aria-label="Salvar">
              <Check size={16} strokeWidth={1.5} />
            </button>
            <button type="button" className={styles.iconButton} onClick={handleCancel} disabled={isSaving} aria-label="Cancelar">
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>
        </>
      ) : (
        <>
          <span className={styles.label}>{credential.label}</span>
          <div className={styles.actions}>
            <button type="button" className={styles.iconButton} onClick={() => setIsEditing(true)} aria-label="Editar">
              <Pencil size={16} strokeWidth={1.5} />
            </button>
            <button type="button" className={styles.iconButtonDanger} onClick={handleDelete} aria-label="Excluir">
              <Trash2 size={16} strokeWidth={1.5} />
            </button>
          </div>
        </>
      )}

      {error && <span className={styles.error}>{error}</span>}
    </li>
  );
}

export default function CredentialsManager({ credentials }) {
  const router = useRouter();
  const [newLabel, setNewLabel] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);

  async function handleAdd() {
    if (!newLabel.trim()) return;
    setIsAdding(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: newLabel }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha ao adicionar');
      setNewLabel('');
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <div className={styles.wrap}>
      {credentials.length === 0 ? (
        <p className={styles.empty}>Nenhuma credencial cadastrada.</p>
      ) : (
        <ul className={styles.list}>
          {credentials.map((credential, index) => (
            <CredentialRow
              key={credential.id}
              credential={credential}
              isFirst={index === 0}
              isLast={index === credentials.length - 1}
            />
          ))}
        </ul>
      )}

      <div className={styles.addRow}>
        <input
          className={styles.input}
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="Nova credencial (ex: SBD)"
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          disabled={isAdding}
        />
        <button type="button" className={styles.addButton} onClick={handleAdd} disabled={isAdding}>
          {isAdding ? 'Adicionando…' : 'Adicionar'}
        </button>
      </div>

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
