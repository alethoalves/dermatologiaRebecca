import AboutForm from '@/components/admin/AboutForm/AboutForm';
import { getAboutContent } from '@/lib/about';
import { getAllCredentials } from '@/lib/credentials';

export const metadata = { title: 'Sobre | Admin' };

export default async function AboutAdminPage() {
  const [about, credentials] = await Promise.all([getAboutContent(), getAllCredentials()]);

  return <AboutForm about={about} credentials={credentials} />;
}
