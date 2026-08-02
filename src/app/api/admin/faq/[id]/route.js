import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireSession } from '@/lib/auth/require-session';
import { getFaqItemById, updateFaqItem, deleteFaqItem } from '@/lib/faq';

export async function GET(request, { params }) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { id } = await params;
  const faqItem = await getFaqItemById(id);
  if (!faqItem) return NextResponse.json({ error: 'Pergunta não encontrada' }, { status: 404 });

  return NextResponse.json({ faqItem });
}

export async function PATCH(request, { params }) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  const faqItem = await updateFaqItem(id, {
    question: body.question,
    answer: body.answer,
    slug: body.slug,
  });

  revalidatePath('/');

  return NextResponse.json({ faqItem });
}

export async function DELETE(request, { params }) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { id } = await params;
  const faqItem = await getFaqItemById(id);
  if (!faqItem) return NextResponse.json({ error: 'Pergunta não encontrada' }, { status: 404 });

  await deleteFaqItem(id);

  revalidatePath('/');

  return NextResponse.json({ ok: true });
}
