import type { Metadata } from "next";
import Header from "@/components/Header";
import ComingSoon from "@/components/ComingSoon";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "不動産ソリューション | STAGE PARTNERS",
  description:
    "STAGE PARTNERSの不動産ソリューションについて。売買・賃貸・管理まで、暮らしと事業の基盤となる不動産をトータルにサポートします。",
};

export default function RealEstatePage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <ComingSoon
          eyebrow="REAL ESTATE SOLUTIONS"
          title="不動産ソリューション"
          description="売買・賃貸・管理まで、暮らしと事業の基盤となる不動産をトータルにサポートし、確かな価値へとつなぎます。"
        />
      </main>
      <Footer />
    </>
  );
}
