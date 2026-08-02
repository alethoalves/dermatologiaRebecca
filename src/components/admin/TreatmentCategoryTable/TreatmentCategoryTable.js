'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import Button from '@/components/ui/Button/Button';
import OrderControls from '@/components/admin/OrderControls/OrderControls';
import styles from './TreatmentCategoryTable.module.scss';

export default function TreatmentCategoryTable({ categories }) {
  const router = useRouter();
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!categoryToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/treatment-categories/${categoryToDelete.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Falha ao excluir a categoria');
      setCategoryToDelete(null);
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
        <h1 className={styles.title}>Tratamentos</h1>
        <Button href="/admin/treatments/new">Nova categoria</Button>
      </div>

      <div className={styles.tableWrap}>
        {categories.length === 0 ? (
          <p className={styles.empty}>Nenhuma categoria cadastrada.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th></th>
                <th>Nome</th>
                <th>Tratamentos</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category.id}>
                  <td>
                    <OrderControls
                      endpoint={`/api/admin/treatment-categories/${category.id}/move`}
                      isFirst={index === 0}
                      isLast={index === categories.length - 1}
                    />
                  </td>
                  <td className={styles.categoryLabel}>{category.label}</td>
                  <td>{category._count.treatments}</td>
                  <td>
                    <div className={styles.actions}>
                      <Link href={`/admin/treatments/${category.id}`} className={styles.actionLink}>
                        Gerenciar tratamentos
                      </Link>
                      <Link href={`/admin/treatments/${category.id}/edit`} className={styles.actionLink}>
                        Editar
                      </Link>
                      <button type="button" className={styles.deleteButton} onClick={() => setCategoryToDelete(category)}>
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

      <Dialog.Root open={!!categoryToDelete} onOpenChange={(open) => !open && setCategoryToDelete(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.overlay} />
          <Dialog.Content className={styles.dialog}>
            <Dialog.Title style={{ fontSize: 'var(--font-size-lg)', fontWeight: 500 }}>Excluir categoria</Dialog.Title>
            <Dialog.Description style={{ color: 'var(--color-ink-soft)', fontSize: 'var(--font-size-sm)' }}>
              Tem certeza que deseja excluir &quot;{categoryToDelete?.label}&quot;? Todos os{' '}
              {categoryToDelete?._count.treatments} tratamentos dentro dela também serão excluídos. Essa ação não pode ser
              desfeita.
            </Dialog.Description>
            <div className={styles.dialogActions}>
              <Button variant="outline" onClick={() => setCategoryToDelete(null)}>
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
