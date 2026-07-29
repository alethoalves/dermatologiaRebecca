import styles from './SectionHeading.module.scss';

function renderTitle(title, highlight) {
  if (!highlight || typeof title !== 'string') return title;
  const index = title.indexOf(highlight);
  if (index === -1) return title;

  return (
    <>
      {title.slice(0, index)}
      <span className={styles.highlight}>{highlight}</span>
      {title.slice(index + highlight.length)}
    </>
  );
}

export default function SectionHeading({ kicker, title, highlight, description, level = 2, align = 'left', className = '' }) {
  const Tag = `h${level}`;
  const wrapClasses = [styles.wrap, align === 'center' && styles.center, className].filter(Boolean).join(' ');

  return (
    <div className={wrapClasses}>
      {kicker && <span className={styles.kicker}>{kicker}</span>}
      <Tag className={styles.title}>{renderTitle(title, highlight)}</Tag>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
