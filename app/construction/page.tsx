import type { Metadata } from "next";
import Header from "@/components/Header";
import ComingSoon from "@/components/ComingSoon";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "建築ソリューション | STAGE PARTNERS",
  description:
    "STAGE PARTNERSの建築ソリューションについて。住まいから商業施設まで、企画・設計・監理を一貫して手がけます。",
};

export default function ConstructionPage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <ComingSoon
          eyebrow="CONSTRUCTION SOLUTIONS"
          title="建築ソリューション"
          description="住まいから商業施設まで、企画・設計・監理を一貫して手がけ、お客様の期待と想いを形にします。"
        />
      </main>
      <Footer />
    </>
  );
}
