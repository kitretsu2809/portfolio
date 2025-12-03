import type { Metadata } from 'next';
import { Inter, Fira_Code } from 'next/font/google';
import './globals.css';
import DesktopContainer from '@/components/DesktopContainer';
import { use } from 'react';
import { Wind } from 'lucide-react';
import { WindowProvider } from '@/context/WindowContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'My Pop!_OS Portfolio',
  description: 'A developer portfolio mimicking the Pop!_OS desktop environment.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${firaCode.variable} font-sans bg-pop-dark text-pop-text-light`}>
        <WindowProvider>
        <DesktopContainer>
          {children}
        </DesktopContainer>
        </WindowProvider>
      </body>
    </html>
  );
}