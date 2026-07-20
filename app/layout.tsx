import type { Metadata } from "next";
import { Shippori_Mincho } from "next/font/google";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const shippori = Shippori_Mincho({
  variable: "--font-shippori-mincho",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "STAGE PARTNERS | 株式会社ステージパートナーズ",
  description:
    "土地と建物に、次の価値を。STAGE PARTNERSは不動産の仲介・管理から建物のリフォームまで、地主さま・オーナーさまの資産の可能性を一貫して引き出すパートナーです。",
  metadataBase: new URL("https://stagepartners.example.com"),
  icons: {
    icon: "/logo-color.png",
    apple: "/logo-color.png",
  },
  openGraph: {
    title: "STAGE PARTNERS | 株式会社ステージパートナーズ",
    description:
      "不動産の仲介・管理から建物のリフォームまで。土地と建物の可能性を一貫して引き出す、地主さま・オーナーさまのためのパートナー。",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={shippori.variable}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <noscript>
          <style>{`[data-page-transition]{display:none!important}`}</style>
        </noscript>
        <PageTransition />
        {children}
      </body>
    </html>
  );
}
