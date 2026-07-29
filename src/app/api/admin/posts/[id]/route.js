import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireSession } from '@/lib/auth/require-session';
import { getPostById, updatePost, deletePost } from '@/lib/posts';

export async function GET(request, { params }) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { id } = await params;
  const post = await getPostById(id);
  if (!post) return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });

  return NextResponse.json({ post });
}

export async function PATCH(request, { params }) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  const post = await updatePost(id, {
    title: body.title,
    slug: body.slug,
    excerpt: body.excerpt,
    coverImageUrl: body.coverImageUrl,
    contentHtml: body.contentHtml,
    seoDescription: body.seoDescription,
    status: body.status,
  });

  revalidatePath('/blog');
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath('/');

  return NextResponse.json({ post });
}

export async function DELETE(request, { params }) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { id } = await params;
  const post = await getPostById(id);
  if (!post) return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });

  await deletePost(id);

  revalidatePath('/blog');
  revalidatePath('/');

  return NextResponse.json({ ok: true });
}
