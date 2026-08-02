import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireSession } from '@/lib/auth/require-session';
import { getAllClinicsForAdmin, createClinic } from '@/lib/clinics';

export async function GET() {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const clinics = await getAllClinicsForAdmin();
  return NextResponse.json({ clinics });
}

export async function POST(request) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const body = await request.json();

  const clinic = await createClinic({
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
