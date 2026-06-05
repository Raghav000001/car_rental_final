import type { Metadata } from "next";
import { Inter } from "next/font/google";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Rohit Tour & Travel - Self Drive Car Rental & Taxi Service in Rohtak",
    template: "%s - Rohit Tour & Travel",
  },
  description:
    "Self drive car rental, airport taxi service, and outstation taxi service in Rohtak. Book Maruti Swift, Baleno, Scorpio, Thar for self drive. Airport drop in Dzire, Ertiga, Carens, Innova. Rohtak taxi rental at best prices.",
  keywords: [
    "Self Drive Car Rental Rohtak",
    "Airport Taxi Service Rohtak",
    "Outstation Taxi Service",
    "Rohtak Taxi Rental",
    "Rohtak Airport Drop",
    "Self Drive Cars in Rohtak",
    "Rohit Tour and Travel",
  ],
  icons: [{ rel: "icon", url: "/logo2.png" }],
  openGraph: {
    title: "Rohit Tour & Travel - Self Drive Car Rental & Taxi Service in Rohtak",
    description:
      "Self drive car rental, airport taxi service, and outstation taxi service in Rohtak. Book Maruti Swift, Baleno, Scorpio, Thar for self drive.",
    url: "https://rohittour.in",
    siteName: "Rohit Tour & Travel",
    images: [{ url: "/logo2.png", width: 512, height: 512 }],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        {children}
        <FloatingContactButtons />
      </body>
    </html>
  );
}
