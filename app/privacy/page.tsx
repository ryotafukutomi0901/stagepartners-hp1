import type { Metadata } from "next";
import Header from "@/components/Header";
import ComingSoon from "@/components/ComingSoon";
import Footer from "@/components/Footer";

// TODO: 最終的な文面は法務確認を経て公開する。取得情報・利用目的・第三者提供・
// 委託・Cookie/アクセス解析・外部サービス・保管期間・安全管理措置・開示等請求の
// 窓口を記載する想定(2026-07-27レビュー決定事項「サイトIA」)。

export const metadata: Metadata = {
  title: "プライバシーポリシー | STAGE PARTNERS",
  description: "株式会社STAGE PARTNERSの個人情報の取扱いについて。",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <ComingSoon
          eyebrow="PRIVACY POLICY"
          title="プライバシーポリシー"
          description="お預かりする個人情報の取得・利用目的・第三者提供・管理体制について記載するページです。最終文面は法務確認のうえ公開します。"
        />
      </main>
      <Footer />
    </>
  );
}
