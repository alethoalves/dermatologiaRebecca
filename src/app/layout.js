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
    'Dermatologia Clínica, Estética, Cirúrgica e Tricologia. Com ética profissional e embasamento científico.',
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Dra. Rebecca Amorim',
    locale: 'pt_BR',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  );
}
