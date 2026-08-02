import TreatmentCategoryTable from '@/components/admin/TreatmentCategoryTable/TreatmentCategoryTable';
import { getAllTreatmentCategoriesForAdmin } from '@/lib/treatments';

export const metadata = { title: 'Tratamentos | Admin' };
export const dynamic = 'force-dynamic';

export default async function AdminTreatmentsPage() {
  const categories = await getAllTreatmentCategoriesForAdmin();
  return <TreatmentCategoryTable categories={categories} />;
}
