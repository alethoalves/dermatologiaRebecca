import { notFound } from 'next/navigation';
import TreatmentTable from '@/components/admin/TreatmentTable/TreatmentTable';
import { getTreatmentCategoryById } from '@/lib/treatments';

export const metadata = { title: 'Tratamentos da categoria | Admin' };
export const dynamic = 'force-dynamic';

export default async function TreatmentCategoryItemsPage({ params }) {
  const { categoryId } = await params;
  const category = await getTreatmentCategoryById(categoryId);

  if (!category) notFound();

  return <TreatmentTable category={category} treatments={category.treatments} />;
}
