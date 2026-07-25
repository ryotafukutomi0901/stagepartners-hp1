import type { Metadata } from "next";
import Header from "@/components/Header";
import ComingSoon from "@/components/ComingSoon";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "お知らせ | STAGE PARTNERS",
  description:
    "STAGE PARTNERSからのお知らせ一覧です。新着情報・施工実績の公開・現場の様子などをお届けします。",
};

export default function NewsPage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <ComingSoon
          eyebrow="NEWS"
          title="お知らせ"
          description="新着情報や施工実績の公開、現場の様子など、STAGE PARTNERSからのお知らせをお届けします。"
        />
      </main>
      <Footer />
    </>
  );
}
