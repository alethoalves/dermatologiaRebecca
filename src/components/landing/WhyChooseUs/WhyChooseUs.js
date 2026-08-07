import Container from '@/components/ui/Container/Container';
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading';
import Reveal from '@/components/motion/Reveal/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/motion/Stagger/Stagger';
import styles from './WhyChooseUs.module.scss';

const PILLARS = [
  {
    title: 'Qualificação Profissional',
    items: [
      'Médica pela Universidade do Estado do Pará (UEPA)',
      'Dermatologista pela Universidade Estadual Paulista (UNESP)',
      <>
        Mestra e Doutoranda pela UNESP, com ênfase em <strong>Melasma</strong>
      </>,
      'Tricologista pelo Hospital do Servidor Público Municipal (HSPM)',
      'Preceptora do Fellow de Tricologia do HSPM',
      'Titular da Sociedade Brasileira de Dermatologia (SBD)',
    ],
  },
  {
    title: 'Beleza que Preserva a sua Identidade',
    text: 'Os procedimentos estéticos são indicados e realizados com o objetivo de realçar a beleza de forma natural, trazendo resultados elegantes e promovendo autoestima e confiança.',
  },
  {
    title: 'Cuidado Integral',
    text: 'Com atuação na dermatologia clínica, estética, cirurgia dermatológica e tricologia, o atendimento é conduzido de forma abrangente e individualizada, considerando as necessidades de cada paciente.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className={styles.section}>
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Nossos diferenciais"
            title={
              <>
                Por que escolher a <br /> Dra. Rebecca?
              </>
            }
            className={styles.heading}
          />
        </Reveal>
        <StaggerGroup className={styles.grid}>
          {PILLARS.map(({ title, text, items }) => (
            <StaggerItem key={title} className={styles.card}>
              <h3 className={styles.cardTitle}>{title}</h3>
              {items ? (
                <ul className={styles.cardList}>
                  {items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className={styles.cardText}>{text}</p>
              )}
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
