import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireSession } from '@/lib/auth/require-session';
import { getAboutContent, updateAboutContent } from '@/lib/about';

export async function GET() {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const about = await getAboutContent();
  return NextResponse.json({ about });
}

export async function PATCH(request) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const body = await request.json();

  const about = await updateAboutContent({
    kicker: body.kicker,
    name: body.name,
    intro: body.intro,
    paragraphs: body.paragraphs,
    photoUrl: body.photoUrl,
    photoAlt: body.photoAlt,
  });

  revalidatePath('/');

  return NextResponse.json({ about });
}
