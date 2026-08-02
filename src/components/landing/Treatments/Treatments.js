import Container from '@/components/ui/Container/Container';
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading';
import Reveal from '@/components/motion/Reveal/Reveal';
import TreatmentExplorer from './TreatmentExplorer';
import { getTreatmentCategoriesForPublic } from '@/lib/treatments';
import styles from './Treatments.module.scss';

export default async function Treatments() {
  const categories = await getTreatmentCategoriesForPublic();

  return (
    <section id="tratamentos" className={styles.section}>
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Tratamentos oferecidos"
            title="Aliando ciência, saúde e beleza no cuidado"
            highlight="saúde e beleza"
            className={styles.heading}
          />
        </Reveal>

        {categories.length > 0 ? (
          <TreatmentExplorer categories={categories} />
        ) : (
          <p className={styles.empty}>Em breve, novos tratamentos por aqui.</p>
        )}
      </Container>
    </section>
  );
}
