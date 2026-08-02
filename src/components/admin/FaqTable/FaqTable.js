'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import Button from '@/components/ui/Button/Button';
import OrderControls from '@/components/admin/OrderControls/OrderControls';
import styles from './FaqTable.module.scss';

export default function FaqTable({ items }) {
  const router = useRouter();
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/faq/${itemToDelete.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Falha ao excluir a pergunta');
      setItemToDelete(null);
      router.refresh();
    } catch (err) {
      alert(err.message);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Perguntas frequentes</h1>
        <Button href="/admin/faq/new">Nova pergunta</Button>
      </div>

      <div className={styles.tableWrap}>
        {items.length === 0 ? (
          <p className={styles.empty}>Nenhuma pergunta cadastrada.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th></th>
                <th>Pergunta</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id}>
                  <td>
                    <OrderControls
                      endpoint={`/api/admin/faq/${item.id}/move`}
                      isFirst={index === 0}
                      isLast={index === items.length - 1}
                    />
                  </td>
                  <td className={styles.question}>{item.question}</td>
                  <td>
                    <div className={styles.actions}>
                      <Link href={`/admin/faq/${item.id}/edit`} className={styles.actionLink}>
                        Editar
                      </Link>
                      <button type="button" className={styles.deleteButton} onClick={() => setItemToDelete(item)}>
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Dialog.Root open={!!itemToDelete} onOpenChange={(open) => !open && setItemToDelete(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.overlay} />
          <Dialog.Content className={styles.dialog}>
            <Dialog.Title style={{ fontSize: 'var(--font-size-lg)', fontWeight: 500 }}>Excluir pergunta</Dialog.Title>
            <Dialog.Description style={{ color: 'var(--color-ink-soft)', fontSize: 'var(--font-size-sm)' }}>
              Tem certeza que deseja excluir &quot;{itemToDelete?.question}&quot;? Essa ação não pode ser desfeita.
            </Dialog.Description>
            <div className={styles.dialogActions}>
              <Button variant="outline" onClick={() => setItemToDelete(null)}>
                Cancelar
              </Button>
              <Button onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Excluindo…' : 'Excluir'}
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
