import TreatmentTable from '@/components/admin/TreatmentTable/TreatmentTable';
import { getAllTreatmentsForAdmin } from '@/lib/treatments';

export const metadata = { title: 'Tratamentos | Admin' };
export const dynamic = 'force-dynamic';

export default async function AdminTreatmentsPage() {
  const treatments = await getAllTreatmentsForAdmin();
  return <TreatmentTable treatments={treatments} />;
}
