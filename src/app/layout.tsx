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
  title: "Rohit Tour & Travel - Premium Car Rental Services",
  description:
    "Find affordable dream cars for rental. Premium car rental services with a wide fleet of vehicles.",
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
