import Image from 'next/image';
import Container from '@/components/ui/Container/Container';
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading';
import Reveal from '@/components/motion/Reveal/Reveal';
import { getAboutContent, splitParagraphs } from '@/lib/about';
import { getAllCredentials } from '@/lib/credentials';
import styles from './About.module.scss';

export default async function About() {
  const [about, credentials] = await Promise.all([getAboutContent(), getAllCredentials()]);
  const paragraphs = splitParagraphs(about.paragraphs);

  return (
    <section id="sobre" className={styles.section}>
      <Container>
        <div className={styles.grid}>
          <Reveal className={styles.imageWrap}>
            <Image
              src={about.photoUrl || '/images/photos/dra-rebecca-jaleco-1.jpg'}
              alt={about.photoAlt || about.name}
              fill
              sizes="(min-width: 1024px) 35vw, 100vw"
              className={styles.image}
            />
          </Reveal>

          <Reveal delay={0.1} className={styles.body}>
            <SectionHeading kicker={about.kicker} title={about.name} />
            <p className={styles.paragraph}>{about.intro}</p>
            {paragraphs.map((paragraph, i) => (
              <p key={i} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
            <div className={styles.credentials}>
              {credentials.map((c) => (
                <span key={c.id} className={styles.credential}>
                  {c.label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
