import Link from 'next/link';
import styles from './Button.module.scss';

const variantClass = {
  primary: styles.primary,
  onDark: styles.onDark,
  outline: styles.outline,
  outlineOnDark: styles.outlineOnDark,
};

export default function Button({
  variant = 'primary',
  size,
  href,
  className = '',
  children,
  ...props
}) {
  const classes = [styles.button, variantClass[variant], size === 'sm' && styles.sizeSm, className]
    .filter(Boolean)
    .join(' ');

  if (href) {
    const isExternal = href.startsWith('http');
    if (isExternal) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
