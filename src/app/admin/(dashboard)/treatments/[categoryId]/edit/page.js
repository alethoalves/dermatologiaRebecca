import { notFound } from 'next/navigation';
import TreatmentCategoryForm from '@/components/admin/TreatmentCategoryForm/TreatmentCategoryForm';
import { getTreatmentCategoryById } from '@/lib/treatments';

export const metadata = { title: 'Editar categoria | Admin' };

export default async function EditTreatmentCategoryPage({ params }) {
  const { categoryId } = await params;
  const category = await getTreatmentCategoryById(categoryId);

  if (!category) notFound();

  return <TreatmentCategoryForm category={category} />;
}
