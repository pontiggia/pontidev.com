import type React from 'react';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

export const metadata: Metadata = {
  title: 'Felipe Pontiggia',
  description:
    'Software engineer. Been coding since I was 16 and never really stopped, mostly building for the web.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --background: oklch(0.97 0.005 90);
                --foreground: oklch(0.15 0.01 50);
                --card: oklch(0.97 0.005 90);
                --card-foreground: oklch(0.15 0.01 50);
                --popover: oklch(0.97 0.005 90);
                --popover-foreground: oklch(0.15 0.01 50);
                --primary: oklch(0.15 0.01 50);
                --primary-foreground: oklch(0.97 0.005 90);
                --secondary: oklch(0.92 0.005 90);
                --secondary-foreground: oklch(0.15 0.01 50);
                --muted: oklch(0.92 0.005 90);
                --muted-foreground: oklch(0.5 0.01 50);
                --accent: oklch(0.92 0.005 90);
                --accent-foreground: oklch(0.15 0.01 50);
                --destructive: oklch(0.577 0.245 27.325);
                --destructive-foreground: oklch(0.577 0.245 27.325);
                --border: oklch(0.88 0.005 90);
                --input: oklch(0.88 0.005 90);
                --ring: oklch(0.5 0.01 50);
              }

              .dark {
                --background: oklch(0.12 0.005 50);
                --foreground: oklch(0.8 0 0);
                --card: oklch(0.12 0.005 50);
                --card-foreground: oklch(0.8 0 0);
                --popover: oklch(0.12 0.005 50);
                --popover-foreground: oklch(0.8 0 0);
                --primary: oklch(0.8 0 0);
                --primary-foreground: oklch(0.12 0.005 50);
                --secondary: oklch(0.18 0.005 50);
                --secondary-foreground: oklch(0.8 0 0);
                --muted: oklch(0.18 0.005 50);
                --muted-foreground: oklch(0.8 0 0);
                --accent: oklch(0.18 0.005 50);
                --accent-foreground: oklch(0.8 0 0);
                --destructive: oklch(0.396 0.141 25.723);
                --destructive-foreground: oklch(0.637 0.237 25.331);
                --border: oklch(0.22 0.005 50);
                --input: oklch(0.22 0.005 50);
                --ring: oklch(0.5 0.005 50);
              }

              .dark h1, .dark h2, .dark h3, .dark h4, .dark h5, .dark h6,
              .dark .hero-text, .dark .blog-tag, .dark .lang-toggle,
              .dark .theme-icon, .dark nav a:hover {
                color: oklch(1 0 0) !important;
              }

              body {
                background-color: oklch(0.97 0.005 90);
                color: oklch(0.15 0.01 50);
              }

              .dark body {
                background-color: oklch(0.12 0.005 50);
                color: oklch(0.8 0 0);
              }
            `,
          }}
        />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
