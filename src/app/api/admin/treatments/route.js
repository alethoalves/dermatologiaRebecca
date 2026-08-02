import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireSession } from '@/lib/auth/require-session';
import { getTreatmentsByCategoryId, createTreatment } from '@/lib/treatments';

export async function GET(request) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('categoryId');

  if (!categoryId) {
    return NextResponse.json({ error: 'categoryId é obrigatório' }, { status: 400 });
  }

  const treatments = await getTreatmentsByCategoryId(categoryId);
  return NextResponse.json({ treatments });
}

export async function POST(request) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const body = await request.json();

  if (!body.categoryId || !body.title || !body.description) {
    return NextResponse.json({ error: 'Categoria, título e descrição são obrigatórios' }, { status: 400 });
  }

  const treatment = await createTreatment({
    categoryId: body.categoryId,
    title: body.title,
    slug: body.slug,
    description: body.description,
    imageUrl: body.imageUrl,
    imageAlt: body.imageAlt,
  });

  revalidatePath('/');

  return NextResponse.json({ treatment }, { status: 201 });
}
