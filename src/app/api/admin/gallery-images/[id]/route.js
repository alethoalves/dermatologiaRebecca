import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireSession } from '@/lib/auth/require-session';
import { getGalleryImageById, updateGalleryImage, deleteGalleryImage } from '@/lib/gallery';

export async function GET(request, { params }) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { id } = await params;
  const image = await getGalleryImageById(id);
  if (!image) return NextResponse.json({ error: 'Imagem não encontrada' }, { status: 404 });

  return NextResponse.json({ image });
}

export async function PATCH(request, { params }) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  const image = await updateGalleryImage(id, {
    imageUrl: body.imageUrl,
    caption: body.caption,
    width: body.width,
    height: body.height,
  });

  revalidatePath('/');

  return NextResponse.json({ image });
}

export async function DELETE(request, { params }) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { id } = await params;
  const image = await getGalleryImageById(id);
  if (!image) return NextResponse.json({ error: 'Imagem não encontrada' }, { status: 404 });

  await deleteGalleryImage(id);

  revalidatePath('/');

  return NextResponse.json({ ok: true });
}
