import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ページが見つかりません | STAGE PARTNERS",
  robots: { index: false, follow: true },
};

const LINKS = [
  { label: "トップページ", href: "/" },
  { label: "事業内容", href: "/business" },
  { label: "施工実績", href: "/works" },
  { label: "お問い合わせ", href: "/contact" },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative flex min-h-[100svh] flex-1 items-center overflow-hidden bg-[#102d40] px-6 py-32 text-white sm:px-10 lg:px-16">
        <div className="relative z-10 mx-auto w-full max-w-[1520px]">
          <p className="flex items-center gap-4 text-[10px] font-normal tracking-[0.35em] text-white/60 sm:text-xs">
            <span aria-hidden className="inline-block h-px w-10 bg-white/35" />
            ERROR 404
          </p>

          <p className="mt-10 text-[clamp(4rem,14vw,11rem)] font-medium leading-none text-white/10">
            404
          </p>

          <h1 className="mt-8 text-2xl font-medium leading-[1.5] sm:text-3xl lg:text-[2.6rem]">
            お探しのページが見つかりませんでした。
          </h1>

          <p className="mt-8 max-w-lg text-sm font-normal leading-loose text-white/70">
            お探しのページは、移動または削除された可能性があります。お手数ですが、以下からお進みください。
          </p>

          <ul className="mt-14 grid grid-cols-1 border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {LINKS.map((link, i) => (
              <li
                key={link.href}
                className={`border-b border-white/15 ${i > 0 ? "sm:border-l sm:border-white/15" : ""}`}
              >
                <Link
                  href={link.href}
                  className="group flex items-center justify-between gap-4 px-0 py-6 transition-colors sm:px-6"
                >
                  <span className="text-sm text-white/85 transition-colors group-hover:text-white">
                    {link.label}
                  </span>
                  <span
                    aria-hidden
                    className="text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
