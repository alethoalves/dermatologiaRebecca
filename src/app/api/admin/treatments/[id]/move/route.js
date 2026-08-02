import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireSession } from '@/lib/auth/require-session';
import { moveTreatment } from '@/lib/treatments';

export async function POST(request, { params }) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  if (body.direction !== 'up' && body.direction !== 'down') {
    return NextResponse.json({ error: 'Direção inválida' }, { status: 400 });
  }

  await moveTreatment(id, body.direction);

  revalidatePath('/');

  return NextResponse.json({ ok: true });
}
