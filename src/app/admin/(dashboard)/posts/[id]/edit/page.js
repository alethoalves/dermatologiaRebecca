import { notFound } from 'next/navigation';
import PostForm from '@/components/admin/PostForm/PostForm';
import { getPostById } from '@/lib/posts';

export const metadata = { title: 'Editar post | Admin' };

export default async function EditPostPage({ params }) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) notFound();

  return <PostForm post={post} />;
}
