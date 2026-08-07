import { notFound } from 'next/navigation';
import TreatmentForm from '@/components/admin/TreatmentForm/TreatmentForm';
import { getTreatmentById, getAllTreatmentCategoriesForAdmin } from '@/lib/treatments';

export const metadata = { title: 'Editar tratamento | Admin' };

export default async function EditTreatmentPage({ params }) {
  const { treatmentId } = await params;
  const [treatment, categories] = await Promise.all([
    getTreatmentById(treatmentId),
    getAllTreatmentCategoriesForAdmin(),
  ]);

  if (!treatment) notFound();

  return <TreatmentForm treatment={treatment} categories={categories} />;
}
