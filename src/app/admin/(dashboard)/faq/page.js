import FaqTable from '@/components/admin/FaqTable/FaqTable';
import { getAllFaqItemsForAdmin } from '@/lib/faq';

export const metadata = { title: 'Perguntas frequentes | Admin' };
export const dynamic = 'force-dynamic';

export default async function AdminFaqPage() {
  const items = await getAllFaqItemsForAdmin();
  return <FaqTable items={items} />;
}
