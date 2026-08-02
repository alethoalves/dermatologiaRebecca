import Image from 'next/image';
import { MapPin, Syringe } from 'lucide-react';
import FaceMelasma from '@/components/icons/FaceMelasma';
import HairStrand from '@/components/icons/HairStrand';
import Container from '@/components/ui/Container/Container';
import WhatsAppButton from '@/components/ui/WhatsAppButton/WhatsAppButton';
import Reveal from '@/components/motion/Reveal/Reveal';
import Float from '@/components/motion/Float/Float';
import { getClinicsForPublic } from '@/lib/clinics';
import styles from './Hero.module.scss';

function formatCities(clinics) {
  const cities = [...new Set(clinics.map((c) => c.city))];
  if (cities.length === 0) return null;
  if (cities.length === 1) return cities[0];
  return `${cities.slice(0, -1).join(', ')} e ${cities[cities.length - 1]}`;
}

function formatClinicsDetail(clinics) {
  if (clinics.length === 0) return null;
  return clinics.map((c) => `${c.name} – ${c.neighborhood}, ${c.city} - ${c.state}`).join(' • ');
}

export default async function Hero() {
  const clinics = await getClinicsForPublic();
  const cities = formatCities(clinics);
  const clinicsDetail = formatClinicsDetail(clinics);

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.grid}>
          <Reveal x={-24} y={0} className={styles.content}>
            <span className={styles.kicker}>Dermatologista{cities ? ` em ${cities}` : ''}</span>
            <h1 className={styles.title}>Dra. Rebecca Amorim</h1>
            <p className={styles.subhead}>
              Atuação na Dermatologia Clínica, Estética, Cirúrgica e Tricologia. Conduzidos com ética profissional e embasamento científico.
            </p>
            <div className={styles.actions}>
              <WhatsAppButton variant="primary">Agende sua consulta</WhatsAppButton>
            </div>
            {clinicsDetail && (
              <span className={styles.tag}>
                <MapPin size={16} strokeWidth={1.5} />
                {clinicsDetail}
              </span>
            )}
          </Reveal>

          <Reveal delay={0.15} y={0} x={24} className={styles.visual}>
            <div className={styles.imageWrap}>
              <Image
                src="/images/photos/hero-photo.JPG"
                alt="Dra. Rebecca Amorim"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className={styles.image}
                priority
              />
            </div>

            <Float delay={0.45} y={12} floatDuration={3.2} className={`${styles.floatCard} ${styles.floatCardTop}`}>
              <span className={styles.floatIcon}>
                <FaceMelasma size={18} />
              </span>
              <strong>Melasma</strong>
            </Float>

            <Float delay={0.55} y={12} floatDuration={3.6} className={`${styles.floatCard} ${styles.floatCardMiddle}`}>
              <span className={styles.floatIcon}>
                <Syringe size={18} strokeWidth={1.5} />
              </span>
              <strong>Procedimentos estéticos</strong>
            </Float>

            <Float delay={0.65} y={12} floatDuration={4} className={`${styles.floatCard} ${styles.floatCardBottom}`}>
              <span className={styles.floatIcon}>
                <HairStrand size={18} />
              </span>
              <strong>Tricologia</strong>
            </Float>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
