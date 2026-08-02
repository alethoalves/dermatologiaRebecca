'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import Button from '@/components/ui/Button/Button';
import OrderControls from '@/components/admin/OrderControls/OrderControls';
import styles from './ClinicTable.module.scss';

export default function ClinicTable({ clinics }) {
  const router = useRouter();
  const [clinicToDelete, setClinicToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!clinicToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/clinics/${clinicToDelete.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Falha ao excluir o endereço');
      setClinicToDelete(null);
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
        <h1 className={styles.title}>Endereços</h1>
        <Button href="/admin/clinics/new">Novo endereço</Button>
      </div>

      <div className={styles.tableWrap}>
        {clinics.length === 0 ? (
          <p className={styles.empty}>Nenhum endereço cadastrado.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th></th>
                <th>Clínica</th>
                <th>Cidade</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {clinics.map((clinic, index) => (
                <tr key={clinic.id}>
                  <td>
                    <OrderControls
                      endpoint={`/api/admin/clinics/${clinic.id}/move`}
                      isFirst={index === 0}
                      isLast={index === clinics.length - 1}
                    />
                  </td>
                  <td className={styles.name}>{clinic.name}</td>
                  <td>
                    {clinic.city} - {clinic.state}
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Link href={`/admin/clinics/${clinic.id}/edit`} className={styles.actionLink}>
                        Editar
                      </Link>
                      <button type="button" className={styles.deleteButton} onClick={() => setClinicToDelete(clinic)}>
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

      <Dialog.Root open={!!clinicToDelete} onOpenChange={(open) => !open && setClinicToDelete(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.overlay} />
          <Dialog.Content className={styles.dialog}>
            <Dialog.Title style={{ fontSize: 'var(--font-size-lg)', fontWeight: 500 }}>Excluir endereço</Dialog.Title>
            <Dialog.Description style={{ color: 'var(--color-ink-soft)', fontSize: 'var(--font-size-sm)' }}>
              Tem certeza que deseja excluir &quot;{clinicToDelete?.name}&quot;? Essa ação não pode ser desfeita.
            </Dialog.Description>
            <div className={styles.dialogActions}>
              <Button variant="outline" onClick={() => setClinicToDelete(null)}>
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
