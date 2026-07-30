import { Newspaper } from 'lucide-react';
import Container from '@/components/ui/Container/Container';
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading';
import Button from '@/components/ui/Button/Button';
import PostCard from '@/components/blog/PostCard/PostCard';
import Reveal from '@/components/motion/Reveal/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/motion/Stagger/Stagger';
import styles from './BlogTeaser.module.scss';

export default function BlogTeaser({ posts = [] }) {
  return (
    <section className={styles.section}>
      <Container>
        <Reveal className={styles.top}>
          <SectionHeading kicker="Blog" title="Saúde e cuidado da pele" highlight="pele" />
          <Button href="/blog" variant="outline">
            Ver todos os posts
          </Button>
        </Reveal>

        {posts.length === 0 ? (
          <div className={styles.empty}>
            <Newspaper size={28} strokeWidth={1.5} />
            <p>Em breve, artigos e novidades sobre saúde e cuidado da pele.</p>
          </div>
        ) : (
          <StaggerGroup className={styles.grid}>
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <PostCard post={post} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </Container>
    </section>
  );
}
