import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireSession } from '@/lib/auth/require-session';
import { getAllPostsForAdmin, createPost } from '@/lib/posts';

export async function GET() {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const posts = await getAllPostsForAdmin();
  return NextResponse.json({ posts });
}

export async function POST(request) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const body = await request.json();

  if (!body.title || !body.contentHtml) {
    return NextResponse.json({ error: 'Título e conteúdo são obrigatórios' }, { status: 400 });
  }

  const post = await createPost({
    title: body.title,
    slug: body.slug,
    excerpt: body.excerpt,
    coverImageUrl: body.coverImageUrl,
    contentHtml: body.contentHtml,
    seoDescription: body.seoDescription,
    status: body.status,
    authorId: session.user.id,
  });

  revalidatePath('/blog');
  revalidatePath('/');

  return NextResponse.json({ post }, { status: 201 });
}
