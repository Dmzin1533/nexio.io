import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { ThemeProvider } from "@/context/ThemeContext";
import ScrollAnimationInitializer from "@/components/ScrollAnimationInitializer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexio - Soluções Digitais Inovadoras",
  description: "Transformando ideias em soluções digitais inovadoras",
  icons: {
    icon: "/nexio-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >

          <ThemeProvider>
            <Header />
            {children}
            <WhatsAppButton />
            <Footer />
            <ScrollAnimationInitializer />
          </ThemeProvider>
      </body>
    </html>
  );
}
