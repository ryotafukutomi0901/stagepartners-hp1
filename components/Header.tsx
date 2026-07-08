"use client";

import { useState } from "react";
import Link from "next/link";
import { useScopedGsap, gsap } from "@/hooks/useGsap";

// "#company" のようなアンカーだけのhrefは、トップページ以外(会社概要・採用情報など)に
// いる時にクリックしても遷移できないため、"/#company" のようにパスを明示する。
const NAV_ITEMS = [
  { label: "私たちについて", href: "/#company" },
  { label: "事業内容", href: "/#business" },
  { label: "会社概要", href: "/company" },
  { label: "採用情報", href: "/recruit" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // headerは position: sticky のため通常のドキュメントフローに乗る。
  // ヒーローの文字と重ならず、スクロール時に背景をより濃い黒へふわっと変化させる。
  const headerRef = useScopedGsap<HTMLElement>(({ scope }) => {
    gsap.set(scope.current, {
      backgroundColor: "rgba(17,17,17,0.85)",
      borderBottomColor: "rgba(255,255,255,0)",
    });

    gsap.to(scope.current, {
      backgroundColor: "rgba(17,17,17,0.98)",
      borderBottomColor: "rgba(255,255,255,0.12)",
      ease: "none",
      scrollTrigger: {
        start: 0,
        end: 120,
        scrub: 0.3,
      },
    });
  }, []);

  return (
    <header
      ref={headerRef}
      data-site-header
      className="sticky top-0 z-50 w-full border-b border-transparent bg-[#111111] backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-[1520px] items-center justify-between px-6 py-5 sm:px-10 lg:px-16">
        <Link href="/" className="leading-tight">
          <span className="block text-sm font-medium tracking-[0.2em] text-white sm:text-base">
            STAGE PARTNERS
          </span>
          <span className="mt-1.5 block text-[9.5px] font-normal tracking-[0.15em] text-white/60">
            株式会社STAGE PARTNERS
          </span>
        </Link>

        <nav
          className="hidden items-center gap-9 lg:flex"
          aria-label="メインナビゲーション"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-xs font-normal tracking-[0.12em] text-white/75 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#contact"
          className="hidden items-center bg-white px-7 py-3 text-xs font-medium tracking-[0.2em] text-[#111111] transition-opacity hover:opacity-80 lg:inline-flex"
        >
          お問い合わせ
        </Link>

        <button
          type="button"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          aria-label="メニューを開閉する"
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`block h-px w-5 bg-white transition-transform duration-300 ${isMenuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
          />
          <span
            className={`block h-px w-5 bg-white transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
          />
          <span
            className={`block h-px w-5 bg-white transition-transform duration-300 ${isMenuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
          />
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="モバイルナビゲーション"
        className={`overflow-hidden bg-[#111111]/98 backdrop-blur-md transition-[max-height,opacity] duration-500 ease-out lg:hidden ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <ul className="flex flex-col gap-1 border-t border-white/10 px-6 py-4 sm:px-10">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 text-sm font-normal tracking-[0.08em] text-white/80"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/#contact"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 inline-flex items-center bg-white px-7 py-3 text-xs font-medium tracking-[0.2em] text-[#111111]"
            >
              お問い合わせ
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
