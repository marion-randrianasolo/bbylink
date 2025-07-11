import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

// Google Font - IBM Plex Sans optimized
const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
});

// Local Font - NuberNext family optimized
const nuberNext = localFont({
  src: [
    {
      path: '../../public/fonts/NuberNext-Regular-BF63c8a0fb4a7c5.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NuberNext-DemiBold-BF63c8a0fa51bc8.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NuberNext-Bold-BF63c8a0b20c2e1.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NuberNext-Heavy-BF63c8a0fb5d005.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NuberNextExtended-Bold-BF63c8a0fc0a590.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NuberNextExtended-Heavy-BF63c8a09da349c.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-nubernext',
  display: 'swap',
});

// Local Font - Monument Extended
const monument = localFont({
  src: '../../public/fonts/monument-extended-regular.woff2',
  variable: '--font-monument',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "BabyLink",
  description: "Votre babyfoot connecté !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`dark ${ibmPlexSans.variable} ${nuberNext.variable} ${monument.variable}`}>
      <body
        className="antialiased"
        style={{backgroundColor: '#0C0E14', color: '#FDFFFF'}}
      >
        <Script
          src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"
          strategy="beforeInteractive"
        />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
