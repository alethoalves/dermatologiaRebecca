import Image from 'next/image';
import { MapPin, GraduationCap, Sparkles } from 'lucide-react';
import Container from '@/components/ui/Container/Container';
import WhatsAppButton from '@/components/ui/WhatsAppButton/WhatsAppButton';
import Reveal from '@/components/motion/Reveal/Reveal';
import { CLINIC } from '@/lib/constants';
import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.grid}>
          <Reveal x={-24} y={0} className={styles.content}>
            <span className={styles.kicker}>Dermatologista em Belém e São Paulo</span>
            <h1 className={styles.title}>Dra. Rebecca Amorim</h1>
            <p className={styles.subhead}>
              Dermatologia focada na trajetória e no cuidado global do paciente, com atendimento
              individualizado e humano. Atuação nas áreas estética, clínica, cirúrgica e capilar de
              forma especializada e com segurança médica.
            </p>
            <div className={styles.actions}>
              <WhatsAppButton variant="primary">Agendar sua consulta particular</WhatsAppButton>
            </div>
            <span className={styles.tag}>
              <MapPin size={16} strokeWidth={1.5} />
              {CLINIC.name} – {CLINIC.neighborhood}, {CLINIC.city} - {CLINIC.state}
            </span>
          </Reveal>

          <Reveal delay={0.15} y={0} x={24} className={styles.visual}>
            <div className={styles.imageWrap}>
              <Image
                src="/images/photos/dra-rebecca-retrato.jpg"
                alt="Dra. Rebecca Amorim"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className={styles.image}
                priority
              />
            </div>

            <Reveal delay={0.45} y={12} className={`${styles.floatCard} ${styles.floatCardTop}`}>
              <span className={styles.floatIcon}>
                <GraduationCap size={18} strokeWidth={1.5} />
              </span>
              <div>
                <strong>UNESP • SBD</strong>
                <span>Residência médica e Sociedade Brasileira de Dermatologia</span>
              </div>
            </Reveal>

            <Reveal delay={0.6} y={12} className={`${styles.floatCard} ${styles.floatCardBottom}`}>
              <span className={styles.floatIcon}>
                <Sparkles size={18} strokeWidth={1.5} />
              </span>
              <div>
                <strong>Estética natural</strong>
                <span>Resultados sutis, com respeito à individualidade</span>
              </div>
            </Reveal>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
