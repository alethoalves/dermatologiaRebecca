import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import AdminSidebar from '@/components/admin/AdminSidebar/AdminSidebar';
import styles from './layout.module.scss';

export default async function AdminDashboardLayout({ children }) {
  const session = await auth();

  if (!session?.user) {
    redirect('/admin/login');
  }

  return (
    <div className={styles.shell}>
      <AdminSidebar userName={session.user.name} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
