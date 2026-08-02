import { notFound } from 'next/navigation';
import FaqForm from '@/components/admin/FaqForm/FaqForm';
import { getFaqItemById } from '@/lib/faq';

export const metadata = { title: 'Editar pergunta | Admin' };

export default async function EditFaqPage({ params }) {
  const { id } = await params;
  const faqItem = await getFaqItemById(id);

  if (!faqItem) notFound();

  return <FaqForm faqItem={faqItem} />;
}
