import type { Metadata } from "next";
import Header from "@/components/Header";
import ComingSoon from "@/components/ComingSoon";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "施工実績 | STAGE PARTNERS",
  description:
    "STAGE PARTNERSの施工実績一覧です。リノベーション・原状回復・買取再販まで、土地と建物に価値を加えてきた仕事をご紹介します。",
};

export default function WorksPage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <ComingSoon
          eyebrow="WORKS"
          title="施工実績"
          description="リノベーション・原状回復から買取再販まで、土地と建物に価値を加えてきた私たちの仕事をご紹介します。"
        />
      </main>
      <Footer />
    </>
  );
}
