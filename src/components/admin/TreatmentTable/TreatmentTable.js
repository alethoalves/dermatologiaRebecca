'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import Button from '@/components/ui/Button/Button';
import OrderControls from '@/components/admin/OrderControls/OrderControls';
import styles from './TreatmentTable.module.scss';

export default function TreatmentTable({ category, treatments }) {
  const router = useRouter();
  const [treatmentToDelete, setTreatmentToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!treatmentToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/treatments/${treatmentToDelete.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Falha ao excluir o tratamento');
      setTreatmentToDelete(null);
      router.refresh();
    } catch (err) {
      alert(err.message);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div>
      <Link href="/admin/treatments" className={styles.backLink}>
        <ArrowLeft size={16} strokeWidth={1.5} />
        Categorias
      </Link>

      <div className={styles.header}>
        <h1 className={styles.title}>{category.label}</h1>
        <Button href={`/admin/treatments/${category.id}/items/new`}>Novo tratamento</Button>
      </div>

      <div className={styles.tableWrap}>
        {treatments.length === 0 ? (
          <p className={styles.empty}>Nenhum tratamento cadastrado nesta categoria.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>Título</th>
                <th>Descrição</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {treatments.map((treatment, index) => (
                <tr key={treatment.id}>
                  <td>
                    <OrderControls
                      endpoint={`/api/admin/treatments/${treatment.id}/move`}
                      isFirst={index === 0}
                      isLast={index === treatments.length - 1}
                    />
                  </td>
                  <td>
                    {treatment.imageUrl ? (
                      <div className={styles.thumb}>
                        <Image
                          src={treatment.imageUrl}
                          alt={treatment.imageAlt || treatment.title}
                          fill
                          sizes="48px"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    ) : (
                      <div className={styles.thumbPlaceholder}>—</div>
                    )}
                  </td>
                  <td className={styles.treatmentTitle}>{treatment.title}</td>
                  <td className={styles.description}>{treatment.description}</td>
                  <td>
                    <div className={styles.actions}>
                      <Link href={`/admin/treatments/${category.id}/items/${treatment.id}/edit`} className={styles.actionLink}>
                        Editar
                      </Link>
                      <button type="button" className={styles.deleteButton} onClick={() => setTreatmentToDelete(treatment)}>
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

      <Dialog.Root open={!!treatmentToDelete} onOpenChange={(open) => !open && setTreatmentToDelete(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.overlay} />
          <Dialog.Content className={styles.dialog}>
            <Dialog.Title style={{ fontSize: 'var(--font-size-lg)', fontWeight: 500 }}>Excluir tratamento</Dialog.Title>
            <Dialog.Description style={{ color: 'var(--color-ink-soft)', fontSize: 'var(--font-size-sm)' }}>
              Tem certeza que deseja excluir &quot;{treatmentToDelete?.title}&quot;? Essa ação não pode ser desfeita.
            </Dialog.Description>
            <div className={styles.dialogActions}>
              <Button variant="outline" onClick={() => setTreatmentToDelete(null)}>
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
