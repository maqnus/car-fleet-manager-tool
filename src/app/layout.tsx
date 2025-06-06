import type { Metadata } from 'next';
import '@navikt/ds-css';
import '@digdir/designsystemet-css/index.css';
import '@digdir/designsystemet-theme';
import '@oddbird/popover-polyfill';
import { ClientProvider } from './ClientProvider';

export const metadata: Metadata = {
  title: 'Car Fleet Manager Tool',
  description: 'Caseoppgave for PIT',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='nb'>
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
