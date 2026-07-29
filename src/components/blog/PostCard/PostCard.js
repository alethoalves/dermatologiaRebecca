import Image from 'next/image';
import Link from 'next/link';
import styles from './PostCard.module.scss';

const dateFormatter = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

export default function PostCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className={styles.card}>
      <div className={styles.image}>
        {post.coverImageUrl && (
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            style={{ objectFit: 'cover' }}
          />
        )}
        {post.publishedAt && <span className={styles.dateBadge}>{dateFormatter.format(new Date(post.publishedAt))}</span>}
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{post.title}</h3>
        {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
      </div>
    </Link>
  );
}
