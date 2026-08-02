import Container from '@/components/ui/Container/Container';
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading';
import Accordion from '@/components/ui/Accordion/Accordion';
import Reveal from '@/components/motion/Reveal/Reveal';
import { getFaqItemsForPublic } from '@/lib/faq';
import styles from './Faq.module.scss';

export default async function Faq() {
  const items = await getFaqItemsForPublic();

  if (items.length === 0) return null;

  return (
    <section id="duvidas" className={styles.section}>
      <Container>
        <Reveal>
          <SectionHeading kicker="Dúvidas frequentes" title="Perguntas que recebemos com frequência" className={styles.heading} />
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion items={items.map((item) => ({ id: item.id, title: item.question, content: item.answer }))} />
        </Reveal>
      </Container>
    </section>
  );
}
