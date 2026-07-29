import { Montserrat, Inter, Jost } from 'next/font/google';
import './globals.scss';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const jost = Jost({
  variable: '--font-jost',
  subsets: ['latin'],
  weight: ['500', '600'],
  display: 'swap',
});

export const metadata = {
  title: 'Dra. Rebecca Amorim | Dermatologista em Belém e São Paulo',
  description:
    'Dermatologia focada na trajetória e no cuidado global do paciente, com atendimento individualizado e humano. Atuação estética, clínica, cirúrgica e capilar com segurança médica.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${inter.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  );
}
