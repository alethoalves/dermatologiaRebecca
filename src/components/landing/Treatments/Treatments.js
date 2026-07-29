'use client';

import Container from '@/components/ui/Container/Container';
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading';
import Reveal from '@/components/motion/Reveal/Reveal';
import TreatmentExplorer from './TreatmentExplorer';
import { treatmentCategories, ulcerasCronicas } from '@/data/treatments';
import styles from './Treatments.module.scss';

export default function Treatments() {
  return (
    <section id="tratamentos" className={styles.section}>
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Tratamentos oferecidos"
            title="Aliando ciência, saúde e beleza no cuidado da sua pele"
            highlight="beleza"
            className={styles.heading}
          />
        </Reveal>

        <TreatmentExplorer categories={treatmentCategories} />

        <Reveal className={styles.ulceras}>
          <h3 className={styles.ulcerasTitle}>{ulcerasCronicas.title}</h3>
          <p className={styles.ulcerasText}>{ulcerasCronicas.description}</p>
        </Reveal>
      </Container>
    </section>
  );
}
