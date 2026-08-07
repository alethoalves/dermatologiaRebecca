'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import Logo from '@/components/ui/Logo/Logo';
import { signOutAction } from '@/lib/auth-actions';
import styles from './AdminSidebar.module.scss';

const NAV_LINKS = [
  { href: '/admin/about', label: 'Sobre' },
  { href: '/admin/clinics', label: 'Endereços' },
  { href: '/admin/posts', label: 'Posts' },
  { href: '/admin/treatments', label: 'Tratamentos' },
  { href: '/admin/treatment-categories', label: 'Categorias de tratamento' },
  { href: '/admin/faq', label: 'Perguntas frequentes' },
];

export default function AdminSidebar({ userName }) {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <Logo type="horizontal" tone="cream" height={28} className={styles.logo} />

      <nav className={styles.nav} aria-label="Navegação do painel">
        {NAV_LINKS.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link key={link.href} href={link.href} className={`${styles.navLink} ${isActive ? styles.active : ''}`}>
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        {userName && <span className={styles.userName}>{userName}</span>}
        <form action={signOutAction}>
          <button type="submit" className={styles.signOutButton}>
            <LogOut size={14} strokeWidth={1.5} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
            Sair
          </button>
        </form>
      </div>
    </aside>
  );
}
