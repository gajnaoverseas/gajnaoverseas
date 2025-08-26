import type { Metadata } from "next";
import { DM_Sans, Lora, Playfair_Display } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


const dmSans = DM_Sans({ subsets: ["latin"] });

// Lora font as fallback for Times New Roman
const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
});

// Playfair Display as another serif alternative
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Gaina Overseas - Exporter of Green Coffee Beans of Indian Origin",
  description: "Exporter of Green Coffee Beans of Indian Origin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`relative ${lora.variable} ${playfair.variable}`}>
  
      <body className={clsx(dmSans.className, "antialiased bg-white")}>
             <Header />
        {children}
           <Footer />
      </body>
       
    </html>
  );
}
