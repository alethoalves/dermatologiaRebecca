import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireSession } from '@/lib/auth/require-session';
import { getAllFaqItemsForAdmin, createFaqItem } from '@/lib/faq';

export async function GET() {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const faqItems = await getAllFaqItemsForAdmin();
  return NextResponse.json({ faqItems });
}

export async function POST(request) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const body = await request.json();

  if (!body.question || !body.answer) {
    return NextResponse.json({ error: 'Pergunta e resposta são obrigatórias' }, { status: 400 });
  }

  const faqItem = await createFaqItem({
    question: body.question,
    answer: body.answer,
    slug: body.slug,
  });

  revalidatePath('/');

  return NextResponse.json({ faqItem }, { status: 201 });
}
