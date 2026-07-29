import Header from '@/components/landing/Header/Header';
import Footer from '@/components/landing/Footer/Footer';
import Container from '@/components/ui/Container/Container';
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading';
import Button from '@/components/ui/Button/Button';
import PostCard from '@/components/blog/PostCard/PostCard';
import Reveal from '@/components/motion/Reveal/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/motion/Stagger/Stagger';
import { getPublishedPosts } from '@/lib/posts';
import styles from './page.module.scss';

export const revalidate = 60;

export const metadata = {
  title: 'Blog | Dra. Rebecca Amorim',
  description: 'Conteúdo sobre saúde e cuidado da pele, escrito pela Dra. Rebecca Amorim.',
};

export default async function BlogPage({ searchParams }) {
  const params = await searchParams;
  const page = Math.max(1, Number(params?.page) || 1);
  const { posts, totalPages } = await getPublishedPosts({ page });

  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <Container>
            <Reveal>
              <SectionHeading kicker="Blog" title="Conteúdo sobre saúde e cuidado da pele" highlight="pele" />
            </Reveal>
          </Container>
        </section>

        <section className={styles.section}>
          <Container>
            {posts.length === 0 ? (
              <p className={styles.empty}>Em breve, artigos e novidades sobre saúde e cuidado da pele.</p>
            ) : (
              <StaggerGroup className={styles.grid}>
                {posts.map((post) => (
                  <StaggerItem key={post.slug}>
                    <PostCard post={post} />
                  </StaggerItem>
                ))}
              </StaggerGroup>
            )}

            {totalPages > 1 && (
              <div className={styles.pagination}>
                {page > 1 && (
                  <Button href={`/blog?page=${page - 1}`} variant="outline">
                    Anterior
                  </Button>
                )}
                {page < totalPages && (
                  <Button href={`/blog?page=${page + 1}`} variant="outline">
                    Próxima
                  </Button>
                )}
              </div>
            )}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
