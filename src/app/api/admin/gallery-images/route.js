import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireSession } from '@/lib/auth/require-session';
import { getAllGalleryImagesForAdmin, createGalleryImage } from '@/lib/gallery';

export async function GET() {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const images = await getAllGalleryImagesForAdmin();
  return NextResponse.json({ images });
}

export async function POST(request) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const body = await request.json();

  if (!body.imageUrl || !body.caption) {
    return NextResponse.json({ error: 'Imagem e legenda são obrigatórias' }, { status: 400 });
  }

  const image = await createGalleryImage({
    imageUrl: body.imageUrl,
    caption: body.caption,
    width: body.width,
    height: body.height,
  });

  revalidatePath('/');

  return NextResponse.json({ image }, { status: 201 });
}
