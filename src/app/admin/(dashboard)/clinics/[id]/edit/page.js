import { notFound } from 'next/navigation';
import ClinicForm from '@/components/admin/ClinicForm/ClinicForm';
import { getClinicById } from '@/lib/clinics';

export const metadata = { title: 'Editar endereço | Admin' };

export default async function EditClinicPage({ params }) {
  const { id } = await params;
  const clinic = await getClinicById(id);

  if (!clinic) notFound();

  return <ClinicForm clinic={clinic} />;
}
