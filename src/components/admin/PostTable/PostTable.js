'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import Badge from '@/components/ui/Badge/Badge';
import Button from '@/components/ui/Button/Button';
import styles from './PostTable.module.scss';

const dateFormatter = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });

const FILTERS = [
  { value: 'ALL', label: 'Todos' },
  { value: 'DRAFT', label: 'Rascunhos' },
  { value: 'PUBLISHED', label: 'Publicados' },
];

export default function PostTable({ posts }) {
  const router = useRouter();
  const [filter, setFilter] = useState('ALL');
  const [postToDelete, setPostToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredPosts = filter === 'ALL' ? posts : posts.filter((p) => p.status === filter);

  async function handleDelete() {
    if (!postToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/posts/${postToDelete.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Falha ao excluir o post');
      setPostToDelete(null);
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
        <h1 className={styles.title}>Posts</h1>
        <Button href="/admin/posts/new">Novo post</Button>
      </div>

      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            className={`${styles.filterButton} ${filter === f.value ? styles.active : ''}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className={styles.tableWrap} style={{ marginTop: 'var(--space-5)' }}>
        {filteredPosts.length === 0 ? (
          <p className={styles.empty}>Nenhum post encontrado.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Título</th>
                <th>Status</th>
                <th>Autor</th>
                <th>Atualizado em</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id}>
                  <td className={styles.postTitle}>{post.title}</td>
                  <td>
                    <Badge tone={post.status === 'PUBLISHED' ? 'success' : 'neutral'}>
                      {post.status === 'PUBLISHED' ? 'Publicado' : 'Rascunho'}
                    </Badge>
                  </td>
                  <td>{post.author?.name || '—'}</td>
                  <td>{dateFormatter.format(new Date(post.updatedAt))}</td>
                  <td>
                    <div className={styles.actions}>
                      <Link href={`/admin/posts/${post.id}/edit`} className={styles.actionLink}>
                        Editar
                      </Link>
                      <button type="button" className={styles.deleteButton} onClick={() => setPostToDelete(post)}>
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

      <Dialog.Root open={!!postToDelete} onOpenChange={(open) => !open && setPostToDelete(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.overlay} />
          <Dialog.Content className={styles.dialog}>
            <Dialog.Title style={{ fontSize: 'var(--font-size-lg)', fontWeight: 500 }}>Excluir post</Dialog.Title>
            <Dialog.Description style={{ color: 'var(--color-ink-soft)', fontSize: 'var(--font-size-sm)' }}>
              Tem certeza que deseja excluir &quot;{postToDelete?.title}&quot;? Essa ação não pode ser desfeita.
            </Dialog.Description>
            <div className={styles.dialogActions}>
              <Button variant="outline" onClick={() => setPostToDelete(null)}>
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
