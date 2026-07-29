import styles from './Badge.module.scss';

const toneClass = {
  neutral: styles.neutral,
  success: styles.success,
};

export default function Badge({ tone = 'neutral', children }) {
  const classes = [styles.badge, toneClass[tone]].filter(Boolean).join(' ');
  return <span className={classes}>{children}</span>;
}
