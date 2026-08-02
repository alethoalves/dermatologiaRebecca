import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/landing/Header/Header';
import Footer from '@/components/landing/Footer/Footer';
import Container from '@/components/ui/Container/Container';
import Button from '@/components/ui/Button/Button';
import PostContent from '@/components/blog/PostContent/PostContent';
import Reveal from '@/components/motion/Reveal/Reveal';
import { getPostBySlug } from '@/lib/posts';
import styles from './page.module.scss';

const dateFormatter = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: 'Post não encontrado | Dra. Rebecca Amorim' };

  return {
    title: `${post.title} | Dra. Rebecca Amorim`,
    description: post.seoDescription || post.excerpt || undefined,
    openGraph: {
      type: 'article',
      url: `/blog/${slug}`,
      title: post.title,
      description: post.seoDescription || post.excerpt || undefined,
      images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
      publishedTime: post.publishedAt || undefined,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <Container>
            <Reveal>
              {post.publishedAt && <div className={styles.date}>{dateFormatter.format(new Date(post.publishedAt))}</div>}
              <h1 className={styles.title}>{post.title}</h1>
              {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
            </Reveal>
          </Container>
        </section>

        <section className={styles.section}>
          <Container>
            {post.coverImageUrl && (
              <Reveal className={styles.coverWrap}>
                <Image src={post.coverImageUrl} alt={post.title} fill sizes="(min-width: 1024px) 720px, 100vw" style={{ objectFit: 'cover' }} priority />
              </Reveal>
            )}

            <Reveal delay={0.1} className={styles.body}>
              <PostContent html={post.contentHtml} />

              <div className={styles.back}>
                <Button href="/blog" variant="outline">
                  <ArrowLeft size={16} strokeWidth={1.5} />
                  Voltar para o blog
                </Button>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
