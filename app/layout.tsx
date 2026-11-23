import type { Metadata } from 'next';
import './globals.css';
import './experiences.css';
import './industry.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://jqsystems.cl'),
  title: 'JQsystems — Diseño web, IA y sistemas digitales',
  description: 'Diseñamos experiencias digitales y desarrollamos sistemas inteligentes para empresas que quieren crecer.',
  openGraph: { title: 'JQsystems — Tecnología que impulsa negocios', description: 'Diseño web, inteligencia artificial y automatización.', type: 'website', locale: 'es_CL' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
