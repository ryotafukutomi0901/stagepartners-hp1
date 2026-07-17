import type { Metadata } from "next";
import Header from "@/components/Header";
import Company from "@/components/Company";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "会社概要 | STAGE PARTNERS",
  description: "STAGE PARTNERSの会社概要ページです。",
};

export default function CompanyOverviewPage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <Company />
      </main>
      <Footer />
    </>
  );
}
