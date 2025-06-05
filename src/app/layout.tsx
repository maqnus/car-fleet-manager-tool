import type { Metadata } from "next";
import '@digdir/designsystemet-css/index.css';
import '@digdir/designsystemet-theme'; // or custom theme CSS file
import '@oddbird/popover-polyfill';

export const metadata: Metadata = {
  title: "Car Fleet Manager Tool",
  description: "Caseoppgave for PIT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
