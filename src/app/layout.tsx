import type { Metadata } from "next";
import { DM_Sans, Lora, Playfair_Display } from "next/font/google";
import clsx from "clsx";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"

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
      <head>
        <meta name="google-site-verification" content="aZeTIAmU9-v_-YxId44bfEzULizzV21qxPzQslpCTfU" />
    <Script id="gtm-head" strategy="afterInteractive">
  {`
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id=GTM-TP78S37C'+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-TP78S37C');
  `}
</Script>
      </head>
      <body className={clsx(dmSans.className, "antialiased bg-white")}>
        <noscript>
  <iframe
    src="https://www.googletagmanager.com/ns.html?id=GTM-TP78S37C"
    height="0"
    width="0"
    style={{ display: "none", visibility: "hidden" }}
  ></iframe>
</noscript>
        <Analytics />
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
