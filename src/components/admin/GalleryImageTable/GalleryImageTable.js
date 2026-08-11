'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import Button from '@/components/ui/Button/Button';
import OrderControls from '@/components/admin/OrderControls/OrderControls';
import styles from './GalleryImageTable.module.scss';

export default function GalleryImageTable({ images }) {
  const router = useRouter();
  const [imageToDelete, setImageToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!imageToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/gallery-images/${imageToDelete.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Falha ao excluir a imagem');
      setImageToDelete(null);
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
        <h1 className={styles.title}>Galeria</h1>
        <Button href="/admin/gallery/new">Nova imagem</Button>
      </div>

      <div className={styles.tableWrap}>
        {images.length === 0 ? (
          <p className={styles.empty}>Nenhuma imagem cadastrada.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>Legenda</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {images.map((image, index) => (
                <tr key={image.id}>
                  <td>
                    <OrderControls
                      endpoint={`/api/admin/gallery-images/${image.id}/move`}
                      isFirst={index === 0}
                      isLast={index === images.length - 1}
                    />
                  </td>
                  <td>
                    <div className={styles.thumb}>
                      <Image src={image.imageUrl} alt={image.imageAlt} fill sizes="48px" style={{ objectFit: 'cover' }} />
                    </div>
                  </td>
                  <td className={styles.imageAlt}>{image.caption}</td>
                  <td>
                    <div className={styles.actions}>
                      <Link href={`/admin/gallery/${image.id}/edit`} className={styles.actionLink}>
                        Editar
                      </Link>
                      <button type="button" className={styles.deleteButton} onClick={() => setImageToDelete(image)}>
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

      <Dialog.Root open={!!imageToDelete} onOpenChange={(open) => !open && setImageToDelete(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.overlay} />
          <Dialog.Content className={styles.dialog}>
            <Dialog.Title style={{ fontSize: 'var(--font-size-lg)', fontWeight: 500 }}>Excluir imagem</Dialog.Title>
            <Dialog.Description style={{ color: 'var(--color-ink-soft)', fontSize: 'var(--font-size-sm)' }}>
              Tem certeza que deseja excluir esta imagem? Essa ação não pode ser desfeita.
            </Dialog.Description>
            <div className={styles.dialogActions}>
              <Button variant="outline" onClick={() => setImageToDelete(null)}>
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
