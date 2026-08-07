import TreatmentForm from '@/components/admin/TreatmentForm/TreatmentForm';
import { getAllTreatmentCategoriesForAdmin } from '@/lib/treatments';

export const metadata = { title: 'Novo tratamento | Admin' };

export default async function NewTreatmentPage() {
  const categories = await getAllTreatmentCategoriesForAdmin();
  return <TreatmentForm categories={categories} />;
}
