import { notFound } from 'next/navigation';
import TreatmentForm from '@/components/admin/TreatmentForm/TreatmentForm';
import { getTreatmentById } from '@/lib/treatments';

export const metadata = { title: 'Editar tratamento | Admin' };

export default async function EditTreatmentPage({ params }) {
  const { categoryId, treatmentId } = await params;
  const treatment = await getTreatmentById(treatmentId);

  if (!treatment) notFound();

  return <TreatmentForm categoryId={categoryId} treatment={treatment} />;
}
