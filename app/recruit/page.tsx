import type { Metadata } from "next";
import Header from "@/components/Header";
import ComingSoon from "@/components/ComingSoon";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "採用情報 | STAGE PARTNERS",
  description:
    "STAGE PARTNERSの採用情報ページです。募集要項は近日公開予定です。",
};

export default function RecruitPage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <ComingSoon
          eyebrow="RECRUIT"
          title="採用情報"
          description="STAGE PARTNERSで共に挑戦する仲間の募集要項を、近日公開予定です。"
        />
      </main>
      <Footer />
    </>
  );
}
