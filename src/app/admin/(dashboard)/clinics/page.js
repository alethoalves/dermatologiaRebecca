import ClinicTable from '@/components/admin/ClinicTable/ClinicTable';
import { getAllClinicsForAdmin } from '@/lib/clinics';

export const metadata = { title: 'Endereços | Admin' };
export const dynamic = 'force-dynamic';

export default async function AdminClinicsPage() {
  const clinics = await getAllClinicsForAdmin();
  return <ClinicTable clinics={clinics} />;
}
