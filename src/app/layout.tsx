import type { Metadata } from "next";
import { DM_Sans, Lora, Playfair_Display } from "next/font/google";
import clsx from "clsx";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import { Analytics } from "@vercel/analytics/next"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Gajna Overseas - Exporter of Green Coffee Beans of Indian Origin.",
  description: "Discover premium Indian coffee beans from Gajna Coffee. We export high-quality Arabica and Robusta coffee beans from India's finest coffee-growing regions.",
  keywords: "Indian coffee, coffee export, Arabica coffee, Robusta coffee, premium coffee beans, coffee trading",
  authors: [{ name: "Gajna Coffee" }],
  openGraph: {
    title: "Gajna Coffee -Exporter of Green Coffee Beans of Indian Origin.",
    description: "Discover premium Indian coffee beans from Gajna Coffee. We export high-quality Arabica and Robusta coffee beans from India's finest coffee-growing regions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`relative ${lora.variable} ${playfair.variable}`}>
      <body className={clsx(dmSans.className, "antialiased bg-white")}>
        <Analytics />
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
