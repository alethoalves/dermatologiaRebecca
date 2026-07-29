import { GraduationCap, Stethoscope, Sparkles } from 'lucide-react';
import Container from '@/components/ui/Container/Container';
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading';
import Reveal from '@/components/motion/Reveal/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/motion/Stagger/Stagger';
import styles from './WhyChooseUs.module.scss';

const PILLARS = [
  {
    icon: GraduationCap,
    title: 'Formação Sólida',
    text: 'Graduação em Medicina pela Universidade do Estado do Pará (UEPA), com Residência Médica em Dermatologia pela Universidade Estadual Paulista (UNESP), Membra Titular da Sociedade Brasileira de Dermatologia (SBD).',
  },
  {
    icon: Stethoscope,
    title: 'Atendimento Amplo',
    text: 'Com competências que abrangem a dermatologia estética, clínica, cirúrgica e capilar. Tratamentos personalizados para diferentes necessidades.',
  },
  {
    icon: Sparkles,
    title: 'Estética Natural',
    text: 'Abordagem que busca resultados sutis e elegantes, com respeito à naturalidade e à individualidade.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className={styles.section}>
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Por que escolher a Dra. Rebecca?"
            title="Cuidado dermatológico completo"
            highlight="completo"
            className={styles.heading}
          />
        </Reveal>
        <StaggerGroup className={styles.grid}>
          {PILLARS.map(({ icon: Icon, title, text }) => (
            <StaggerItem key={title} className={styles.card}>
              <span className={styles.iconWrap}>
                <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardText}>{text}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
