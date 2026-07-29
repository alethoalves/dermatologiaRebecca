import styles from './Container.module.scss';

export default function Container({ as: Tag = 'div', className = '', children, ...props }) {
  const classes = className ? `${styles.container} ${className}` : styles.container;
  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}
