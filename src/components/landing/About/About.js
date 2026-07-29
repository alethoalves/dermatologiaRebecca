import Image from 'next/image';
import Container from '@/components/ui/Container/Container';
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading';
import Reveal from '@/components/motion/Reveal/Reveal';
import styles from './About.module.scss';

const PARAGRAPHS = [
  'Sou médica formada pela Universidade do Estado do Pará (UEPA) e fiz a minha residência médica em dermatologia em São Paulo, na Universidade Estadual Paulista (UNESP), tendo uma formação de excelência. Durante a residência iniciei e concluí o meu Mestrado em Melasma e atualmente curso o programa de Doutorado também em Melasma, sendo uma das minhas áreas de expertise (doenças pigmentares) — poder melhorar as manchas da pele, algo que prejudica tanto a autoestima quanto a qualidade de vida das minhas pacientes, me traz muita satisfação. Sou apaixonada por pesquisa clínica e estudo para que a minha medicina seja baseada em evidências confiáveis e que traga benefício aos pacientes.',
  'Também fiz uma formação complementar em Tricologia, área da dermatologia responsável por diagnosticar e tratar doenças dos cabelos e do couro cabeludo. Atualmente sou preceptora do programa de Fellow em cabelo do Hospital do Servidor Público Municipal (HSPM), participando de reuniões científicas e ministrando aulas.',
  'Sou membra da Sociedade Brasileira de Dermatologia (SBD), participo constantemente de eventos científicos e me mantenho atualizada para enquadrar minha prática clínica dentro do que está alinhado com a evidência científica. Realizo treinamentos frequentes em procedimentos estéticos com as grandes empresas do mercado (preenchedores, bioestimuladores, fios, toxina botulínica).',
  'Sintam-se muito bem-vindos e acolhidos — será um prazer iniciar essa caminhada de cuidado com vocês. Que ela seja cercada de escuta, ciência, ética, bem-estar, melhora da autoestima e acolhida.',
];

const CREDENTIALS = ['UEPA', 'Residência UNESP', 'Mestrado em Melasma', 'Doutorado em Melasma (em andamento)', 'Tricologia', 'SBD'];

export default function About() {
  return (
    <section id="sobre" className={styles.section}>
      <Container>
        <div className={styles.grid}>
          <Reveal className={styles.imageWrap}>
            <Image
              src="/images/photos/dra-rebecca-jaleco-1.jpg"
              alt="Dra. Rebecca Amorim no consultório"
              fill
              sizes="(min-width: 1024px) 35vw, 100vw"
              className={styles.image}
            />
          </Reveal>

          <Reveal delay={0.1} className={styles.body}>
            <SectionHeading kicker="Conheça a" title="Dra. Rebecca Amorim" />
            <p className={styles.paragraph}>
              Olá, muito prazer! Minha prática clínica é focada em garantir um atendimento ético e completo,
              respeitando a individualidade de cada um e buscando ser resolutiva em todas as esferas da
              dermatologia (estética, clínica, cirúrgica e capilar). Busco enaltecer a beleza natural e indico
              procedimentos que façam sentido a cada paciente.
            </p>
            {PARAGRAPHS.map((paragraph, i) => (
              <p key={i} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
            <div className={styles.credentials}>
              {CREDENTIALS.map((c) => (
                <span key={c} className={styles.credential}>
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
