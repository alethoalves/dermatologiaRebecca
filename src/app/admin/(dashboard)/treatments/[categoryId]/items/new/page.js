import { notFound } from 'next/navigation';
import TreatmentForm from '@/components/admin/TreatmentForm/TreatmentForm';
import { getTreatmentCategoryById } from '@/lib/treatments';

export const metadata = { title: 'Novo tratamento | Admin' };

export default async function NewTreatmentPage({ params }) {
  const { categoryId } = await params;
  const category = await getTreatmentCategoryById(categoryId);

  if (!category) notFound();

  return <TreatmentForm categoryId={categoryId} />;
}
