import type { Metadata } from "next";
import localFont from "next/font/local";
import { ReactNode } from "react";

import "./globals.css";

const satoshi = localFont({
  src: "../public/fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
  title: "Konfigurator Servisa",
  description: "Izračunajte trošak servisa",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${satoshi.variable} antialiased`}>{children}</body>
    </html>
  );
};

export default RootLayout;
