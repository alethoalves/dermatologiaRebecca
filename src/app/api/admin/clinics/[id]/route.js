import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireSession } from '@/lib/auth/require-session';
import { getClinicById, updateClinic, deleteClinic } from '@/lib/clinics';

export async function GET(request, { params }) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { id } = await params;
  const clinic = await getClinicById(id);
  if (!clinic) return NextResponse.json({ error: 'Endereço não encontrado' }, { status: 404 });

  return NextResponse.json({ clinic });
}

export async function PATCH(request, { params }) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  const clinic = await updateClinic(id, {
    name: body.name,
    neighborhood: body.neighborhood,
    city: body.city,
    state: body.state,
    address: body.address,
    zip: body.zip,
    hours: body.hours,
    note: body.note,
  });

  revalidatePath('/');

  return NextResponse.json({ clinic });
}

export async function DELETE(request, { params }) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { id } = await params;
  const clinic = await getClinicById(id);
  if (!clinic) return NextResponse.json({ error: 'Endereço não encontrado' }, { status: 404 });

  await deleteClinic(id);

  revalidatePath('/');

  return NextResponse.json({ ok: true });
}
