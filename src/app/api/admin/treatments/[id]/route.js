import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireSession } from '@/lib/auth/require-session';
import { getTreatmentById, updateTreatment, deleteTreatment } from '@/lib/treatments';

export async function GET(request, { params }) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { id } = await params;
  const treatment = await getTreatmentById(id);
  if (!treatment) return NextResponse.json({ error: 'Tratamento não encontrado' }, { status: 404 });

  return NextResponse.json({ treatment });
}

export async function PATCH(request, { params }) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  const treatment = await updateTreatment(id, {
    categoryId: body.categoryId,
    title: body.title,
    slug: body.slug,
    description: body.description,
    imageUrl: body.imageUrl,
    imageAlt: body.imageAlt,
  });

  revalidatePath('/');

  return NextResponse.json({ treatment });
}

export async function DELETE(request, { params }) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { id } = await params;
  const treatment = await getTreatmentById(id);
  if (!treatment) return NextResponse.json({ error: 'Tratamento não encontrado' }, { status: 404 });

  await deleteTreatment(id);

  revalidatePath('/');

  return NextResponse.json({ ok: true });
}
