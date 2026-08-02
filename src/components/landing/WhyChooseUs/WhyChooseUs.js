import Container from '@/components/ui/Container/Container';
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading';
import Reveal from '@/components/motion/Reveal/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/motion/Stagger/Stagger';
import styles from './WhyChooseUs.module.scss';

const PILLARS = [
  {
    title: 'Formação e Atuação em Locais de Referência',
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
    text: 'Procedimentos estéticos são indicados e realizados com o objetivo de realçar a beleza de forma natural, promovendo autoestima e confiança.',
  },
  {
    title: 'Cuidado Global ao Paciente',
    text: 'Com competências que abrangem a dermatologia clínica, a estética, a cirurgia dermatológica e a tricologia, o atendimento busca resolver todas as necessidades da sua pele.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className={styles.section}>
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Cuidado dermatológico completo"
            title="Por que escolher a Dra. Rebecca?"
            highlight="completo"
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
