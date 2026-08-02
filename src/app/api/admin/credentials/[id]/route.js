import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireSession } from '@/lib/auth/require-session';
import { updateCredential, deleteCredential } from '@/lib/credentials';

export async function PATCH(request, { params }) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  if (!body.label?.trim()) {
    return NextResponse.json({ error: 'Informe o texto da credencial' }, { status: 400 });
  }

  const credential = await updateCredential(id, { label: body.label.trim() });

  revalidatePath('/');

  return NextResponse.json({ credential });
}

export async function DELETE(request, { params }) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { id } = await params;
  await deleteCredential(id);

  revalidatePath('/');

  return NextResponse.json({ ok: true });
}
