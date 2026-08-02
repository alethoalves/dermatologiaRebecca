import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireSession } from '@/lib/auth/require-session';
import { getTreatmentCategoryById, updateTreatmentCategory, deleteTreatmentCategory } from '@/lib/treatments';

export async function GET(request, { params }) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { id } = await params;
  const category = await getTreatmentCategoryById(id);
  if (!category) return NextResponse.json({ error: 'Categoria não encontrada' }, { status: 404 });

  return NextResponse.json({ category });
}

export async function PATCH(request, { params }) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  const category = await updateTreatmentCategory(id, {
    label: body.label,
    slug: body.slug,
  });

  revalidatePath('/');

  return NextResponse.json({ category });
}

export async function DELETE(request, { params }) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { id } = await params;
  const category = await getTreatmentCategoryById(id);
  if (!category) return NextResponse.json({ error: 'Categoria não encontrada' }, { status: 404 });

  await deleteTreatmentCategory(id);

  revalidatePath('/');

  return NextResponse.json({ ok: true });
}
