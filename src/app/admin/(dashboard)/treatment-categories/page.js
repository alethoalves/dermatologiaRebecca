import TreatmentCategoryTable from '@/components/admin/TreatmentCategoryTable/TreatmentCategoryTable';
import { getAllTreatmentCategoriesForAdmin } from '@/lib/treatments';

export const metadata = { title: 'Categorias de tratamento | Admin' };
export const dynamic = 'force-dynamic';

export default async function AdminTreatmentCategoriesPage() {
  const categories = await getAllTreatmentCategoriesForAdmin();
  return <TreatmentCategoryTable categories={categories} />;
}
