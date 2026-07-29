import { sanitizePostHtml } from '@/lib/sanitize';
import styles from './PostContent.module.scss';

export default function PostContent({ html }) {
  return <div className={styles.content} dangerouslySetInnerHTML={{ __html: sanitizePostHtml(html) }} />;
}
