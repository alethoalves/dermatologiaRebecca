import Button from '../Button/Button';
import WhatsAppIcon from './WhatsAppIcon';
import { WHATSAPP_URL } from '@/lib/constants';

export default function WhatsAppButton({ variant = 'primary', size, children, ...props }) {
  return (
    <Button href={WHATSAPP_URL} variant={variant} size={size} {...props}>
      <WhatsAppIcon />
      {children ?? 'Agendar sua consulta'}
    </Button>
  );
}
