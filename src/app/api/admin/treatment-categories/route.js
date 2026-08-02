import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireSession } from '@/lib/auth/require-session';
import { getAllTreatmentCategoriesForAdmin, createTreatmentCategory } from '@/lib/treatments';

export async function GET() {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const categories = await getAllTreatmentCategoriesForAdmin();
  return NextResponse.json({ categories });
}

export async function POST(request) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const body = await request.json();

  if (!body.label) {
    return NextResponse.json({ error: 'Nome da categoria é obrigatório' }, { status: 400 });
  }

  const category = await createTreatmentCategory({
    label: body.label,
    slug: body.slug,
  });

  revalidatePath('/');

  return NextResponse.json({ category }, { status: 201 });
}
