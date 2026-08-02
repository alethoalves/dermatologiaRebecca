import Link from 'next/link';
import Container from '@/components/ui/Container/Container';
import Logo from '@/components/ui/Logo/Logo';
import WhatsAppButton from '@/components/ui/WhatsAppButton/WhatsAppButton';
import { getClinicsForPublic } from '@/lib/clinics';
import { getAboutContent } from '@/lib/about';
import styles from './Footer.module.scss';

const NAV_LINKS = [
  { href: '/#tratamentos', label: 'Tratamentos' },
  { href: '/#sobre', label: 'Sobre' },
  { href: '/#duvidas', label: 'Dúvidas' },
  { href: '/blog', label: 'Blog' },
];

export default async function Footer() {
  const year = new Date().getFullYear();
  const [clinics, about] = await Promise.all([getClinicsForPublic(), getAboutContent()]);
  const professionalMeta = [about.crm, about.rqe].filter(Boolean).join(' · ');

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <Link href="/" className={styles.logoLink}>
            <Logo type="horizontal" tone="cream" height={38} />
          </Link>
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
          <div className={styles.addresses}>
            {clinics.map((clinic) => (
              <span key={clinic.id}>
                {clinic.name} — {clinic.address}, CEP {clinic.zip}
              </span>
            ))}
          </div>
          {professionalMeta && <span>{professionalMeta}</span>}
          <span>© {year} Rebecca Perez de Amorim. Todos os direitos reservados.</span>
        </div>
      </Container>
    </footer>
  );
}
