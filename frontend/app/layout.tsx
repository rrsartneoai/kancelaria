import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PrawnikAI",
  description: "PrawnikAI - Twój prawny asystent AI",
  generator: "PrawnikAI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={montserrat.className}>
      <head>
        <link rel="icon" href="/placeholder-logo.svg" type="image/svg+xml" />
        <title>PrawnikAI</title>
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
