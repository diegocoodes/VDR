import type { Metadata, Viewport } from 'next';
import '@fontsource/barlow-condensed/600.css';
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/barlow-condensed/800.css';
import '@fontsource/barlow-condensed/600-italic.css';
import '@fontsource/barlow-condensed/700-italic.css';
import '@fontsource-variable/manrope';
import './globals.css';
import { company } from '@/data/site';
import { MotionProvider } from '@/components/reveal';
import { BrandIntro } from '@/components/brand-intro';

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: 'VDR Studio Automotivo | PPF e Vitrificação em Mirassol',
  description:
    'PPF, vitrificação, polimento técnico e proteção zero km em Mirassol. VDR Studio Automotivo, atendendo São José do Rio Preto e região. Solicite seu orçamento.',
  applicationName: company.name,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: company.name,
    title: 'A pintura original do seu carro merece continuar original.',
    description:
      'Proteção automotiva com atenção a cada detalhe. PPF, vitrificação e polimento técnico em Mirassol e região de São José do Rio Preto.',
    images: [
      {
        url: '/images/og-vdr.jpg',
        width: 1200,
        height: 630,
        alt: 'VDR Studio Automotivo, proteção e estética automotiva em Mirassol',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VDR Studio Automotivo | Proteção em cada detalhe',
    images: ['/images/og-vdr.jpg'],
  },
  icons: { icon: '/icon.png', apple: '/icon.png' },
};

export const viewport: Viewport = {
  themeColor: '#090B0A',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <BrandIntro />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
