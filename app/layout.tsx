import type { Metadata } from "next";
import {
  Shippori_Mincho, Amiri_Quran
} from "next/font/google";
import "./globals.css";

const shippori = Shippori_Mincho({
  variable: "--font-shippori-mincho",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Heroの「CREATE A YOUR STAGE」専用の見出し用フォント
// Amiri Quranは weight:"400" / style:"normal" のみ対応
const amiriQuran = Amiri_Quran({
  variable: "--font-amiri-quran",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "STAGE PARTNERS | 株式会社ステージパートナーズ",
  description:
    "STAGE PARTNERSは、建築と不動産を通じて挑戦する人・企業・地域に価値ある舞台を提供するコーポレートパートナーです。",
  metadataBase: new URL("https://stagepartners.example.com"),
  openGraph: {
    title: "STAGE PARTNERS | 株式会社ステージパートナーズ",
    description:
      "建築と不動産を通じ、挑戦する人・企業・地域に価値ある舞台を提供する。STAGE PARTNERSは空間づくりを通じて未来を支えます。",
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
    <html lang="ja" className={`${shippori.variable} ${amiriQuran.variable}`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
