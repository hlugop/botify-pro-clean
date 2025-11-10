import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Botify - Atención al Cliente con IA 24/7",
  description: "Transforma tu servicio al cliente con chatbots impulsados por IA. Respuestas instantáneas, 24/7, que liberan a tu equipo para enfocarse en crecer tu negocio.",
  keywords: "chatbot, IA, inteligencia artificial, atención al cliente, automatización, WhatsApp, servicio al cliente",
  authors: [{ name: "Botify" }],
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://botify.com',
    title: 'Botify - Atención al Cliente con IA 24/7',
    description: 'Transforma tu servicio al cliente con chatbots impulsados por IA',
    siteName: 'Botify',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Botify - Atención al Cliente con IA 24/7',
    description: 'Transforma tu servicio al cliente con chatbots impulsados por IA',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
