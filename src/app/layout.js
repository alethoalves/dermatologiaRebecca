import { Montserrat } from 'next/font/google';
import './globals.scss';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://www.drarebeccaamorim.com.br'),
  title: 'Dra. Rebecca Amorim | Dermatologista em São Paulo e Belém',
  description:
    'Atuação na Dermatologia Clínica, Estética, Cirúrgica e Tricologia. Conduzidos com ética profissional e embasamento científico.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  );
}
