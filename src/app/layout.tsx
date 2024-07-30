import '@/styles/globals.css';

import type { Metadata } from 'next';
import Script from 'next/script';

import { ThemeProvider } from '@/components/theme-provider';
import { fontMono, fontSans } from '@/config/fonts';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { TRPCReactProvider } from '@/trpc/react';

export const metadata: Metadata = {
  title: {
    default: `Link In Bio | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(fontSans.variable, fontMono.variable)}>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </TRPCReactProvider>
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "0cc2e38edcde4bd4b2efdd6130b23cad"}'
        />
      </body>
    </html>
  );
}
