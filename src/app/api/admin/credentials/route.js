import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireSession } from '@/lib/auth/require-session';
import { getAllCredentials, createCredential } from '@/lib/credentials';

export async function GET() {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const credentials = await getAllCredentials();
  return NextResponse.json({ credentials });
}

export async function POST(request) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const body = await request.json();
  if (!body.label?.trim()) {
    return NextResponse.json({ error: 'Informe o texto da credencial' }, { status: 400 });
  }

  const credential = await createCredential({ label: body.label.trim() });

  revalidatePath('/');

  return NextResponse.json({ credential });
}
