import { NextResponse } from 'next/server';
import { requireSession } from '@/lib/auth/require-session';
import { uploadImage } from '@/lib/storage';

export async function POST(request) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get('file');

  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
  }

  const folder = formData.get('folder') || 'posts';

  try {
    const { url, key, width, height } = await uploadImage(file, { folder });
    return NextResponse.json({ url, key, width, height });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
