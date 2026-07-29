'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import Container from '@/components/ui/Container/Container';
import Logo from '@/components/ui/Logo/Logo';
import WhatsAppButton from '@/components/ui/WhatsAppButton/WhatsAppButton';
import styles from './Header.module.scss';

const NAV_LINKS = [
  { href: '/#tratamentos', label: 'Tratamentos' },
  { href: '/#sobre', label: 'Sobre' },
  { href: '/#duvidas', label: 'Dúvidas' },
  { href: '/blog', label: 'Blog' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      className={styles.header}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Container>
        <div className={styles.bar}>
          <Link href="/" className={styles.logoLink} onClick={() => setOpen(false)}>
            <Logo type="horizontal" tone="ink" height={34} priority />
          </Link>

          <nav className={styles.nav} aria-label="Navegação principal">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.ctaDesktop}>
            <WhatsAppButton size="sm" />
          </div>

          <button
            type="button"
            className={styles.menuToggle}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          >
            {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              className={styles.mobilePanel}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <nav className={styles.mobileNav} aria-label="Navegação móvel">
                {NAV_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} className={styles.mobileNavLink} onClick={() => setOpen(false)}>
                    {link.label}
                  </Link>
                ))}
              </nav>
              <WhatsAppButton />
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </motion.header>
  );
}
