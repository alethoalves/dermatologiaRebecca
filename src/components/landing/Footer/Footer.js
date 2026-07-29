import Link from 'next/link';
import Container from '@/components/ui/Container/Container';
import Logo from '@/components/ui/Logo/Logo';
import WhatsAppButton from '@/components/ui/WhatsAppButton/WhatsAppButton';
import { CLINIC } from '@/lib/constants';
import styles from './Footer.module.scss';

const NAV_LINKS = [
  { href: '/#tratamentos', label: 'Tratamentos' },
  { href: '/#sobre', label: 'Sobre' },
  { href: '/#duvidas', label: 'Dúvidas' },
  { href: '/blog', label: 'Blog' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <Logo type="horizontal" tone="cream" height={38} className={styles.logo} />
          <nav className={styles.nav} aria-label="Navegação do rodapé">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>
          <WhatsAppButton variant="onDark" size="sm" />
        </div>

        <div className={styles.bottom}>
          <span>
            {CLINIC.name} — {CLINIC.address}, CEP {CLINIC.zip}
          </span>
          <span>© {year} Rebecca Perez de Amorim. Todos os direitos reservados.</span>
        </div>
      </Container>
    </footer>
  );
}
