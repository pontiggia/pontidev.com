import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import './globals.css';

const description =
  'Software engineer from Argentina, in San Francisco building Circleback. I build side projects, break things, and write about what I figure out.';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.felipepontiggia.com'),
  title: { default: 'Felipe Pontiggia', template: '%s · Felipe Pontiggia' },
  description,
  openGraph: {
    title: 'Felipe Pontiggia',
    description,
    siteName: 'Felipe Pontiggia',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', creator: '@pontidev' },
};

const themeScript = `try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YBGYSMVV0N"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YBGYSMVV0N');
          `}
        </Script>
        <SpeedInsights />
        <div className="mx-auto w-full max-w-7xl px-8 py-8 md:px-16 md:py-10 lg:px-24">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
