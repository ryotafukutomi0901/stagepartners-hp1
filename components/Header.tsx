"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScopedGsap, gsap } from "@/hooks/useGsap";

// "#news" のようなアンカーだけのhrefは、トップページ以外(会社概要・採用情報など)に
// いる時にクリックしても遷移できないため、"/#news" のようにパスを明示する。
type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const NAV_ITEMS: NavItem[] = [
  { label: "TOP", href: "/" },
  {
    label: "事業内容",
    href: "/#business",
    children: [
      { label: "不動産事業（仲介・管理）", href: "/real-estate" },
      { label: "建設事業（リフォーム）", href: "/construction" },
    ],
  },
  {
    label: "会社概要",
    href: "/company",
    children: [
      { label: "会社情報", href: "/company" },
      { label: "代表メッセージ", href: "/company#message" },
      { label: "アクセス", href: "/company#access" },
    ],
  },
  {
    label: "お知らせ",
    href: "/#news",
    children: [
      { label: "新着情報", href: "/#news" },
      { label: "プレスリリース", href: "/#news" },
    ],
  },
  {
    label: "お問い合わせ",
    href: "/#contact",
    children: [
      { label: "お問い合わせフォーム", href: "/#contact" },
      { label: "資料請求", href: "/#contact" },
    ],
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState<string | null>(null);

  // headerは position: absolute で最上部に重ねる。ヒーローの文字と重ならず、
  // スクロール時に背景を濃い黒へふわっと変化させる。
  const headerRef = useScopedGsap<HTMLElement>(({ scope }) => {
    gsap.set(scope.current, {
      backgroundColor: "rgba(17,17,17,0)",
      borderBottomColor: "rgba(255,255,255,0)",
    });

    gsap.to(scope.current, {
      backgroundColor: "rgba(17,17,17,0.96)",
      borderBottomColor: "rgba(255,255,255,0.08)",
      backdropFilter: "blur(12px)",
      ease: "none",
      scrollTrigger: { start: 0, end: 120, scrub: 0.3 },
    });
  }, []);

  return (
    <header
      ref={headerRef}
      data-site-header
      className="fixed top-0 left-0 z-50 w-full border-b border-transparent"
    >
      <div className="mx-auto flex max-w-[1520px] items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        <Link href="/" aria-label="STAGE PARTNERS トップへ" className="shrink-0">
          <Image
            src="/logo-mono-white.png"
            alt="STAGE PARTNERS"
            width={400}
            height={97}
            priority
            className="h-7 w-auto sm:h-8"
          />
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="メインナビゲーション"
        >
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="group relative">
              <Link
                href={item.href}
                className="inline-flex items-center gap-1.5 py-6 text-xs font-normal tracking-[0.12em] text-white/80 transition-colors hover:text-white"
              >
                {item.label}
                {item.children && (
                  <span
                    aria-hidden
                    className="mt-px inline-block h-1 w-1 rotate-45 border-b border-r border-white/50 transition-colors group-hover:border-white"
                  />
                )}
              </Link>

              {item.children && (
                <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <ul className="min-w-[220px] border border-white/10 bg-[#111111]/98 py-2 shadow-2xl backdrop-blur-md">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className="block whitespace-nowrap px-5 py-3 text-xs font-normal tracking-[0.08em] text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          aria-label="メニューを開閉する"
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`block h-px w-5 bg-white transition-transform duration-300 ${isMenuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-5 bg-white transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`block h-px w-5 bg-white transition-transform duration-300 ${isMenuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* モバイル: 各項目をアコーディオンで開閉して次階層を表示 */}
      <nav
        id="mobile-nav"
        aria-label="モバイルナビゲーション"
        className={`overflow-hidden bg-[#111111]/98 backdrop-blur-md transition-[max-height,opacity] duration-500 ease-out lg:hidden ${isMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <ul className="flex flex-col border-t border-white/10 px-6 py-2 sm:px-10">
          {NAV_ITEMS.map((item) => (
            <li key={item.label} className="border-b border-white/5">
              <div className="flex items-center justify-between">
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block flex-1 py-4 text-sm font-normal tracking-[0.08em] text-white/85"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <button
                    type="button"
                    aria-label={`${item.label}のサブメニューを開閉`}
                    aria-expanded={openMobile === item.label}
                    onClick={() =>
                      setOpenMobile((v) => (v === item.label ? null : item.label))
                    }
                    className="flex h-11 w-11 items-center justify-center text-white/60"
                  >
                    <span
                      className={`inline-block h-2 w-2 rotate-45 border-b border-r border-white/60 transition-transform duration-300 ${openMobile === item.label ? "-rotate-[135deg]" : ""}`}
                    />
                  </button>
                )}
              </div>

              {item.children && (
                <ul
                  className={`overflow-hidden transition-[max-height,opacity] duration-300 ${openMobile === item.label ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  {item.children.map((child) => (
                    <li key={child.label}>
                      <Link
                        href={child.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-3 pl-4 text-xs font-normal tracking-[0.06em] text-white/60"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
