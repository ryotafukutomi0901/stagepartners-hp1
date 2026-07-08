import type { Metadata } from "next";
import Header from "@/components/Header";
import ComingSoon from "@/components/ComingSoon";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "会社概要 | STAGE PARTNERS",
  description:
    "STAGE PARTNERSの会社概要ページです。詳しい情報は近日公開予定です。",
};

export default function CompanyOverviewPage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <ComingSoon
          eyebrow="COMPANY PROFILE"
          title="会社概要"
          description="社名・所在地・沿革など、STAGE PARTNERSの詳しい会社情報を掲載予定です。"
        />
      </main>
      <Footer />
    </>
  );
}
