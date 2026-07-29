export default function IconWrapper({ icon: Icon, size = 20, strokeWidth = 1.5, ...props }) {
  return <Icon size={size} strokeWidth={strokeWidth} aria-hidden="true" {...props} />;
}
