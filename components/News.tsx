"use client";

import Link from "next/link";
import { useScopedGsap, gsap } from "@/hooks/useGsap";
import { scrollTriggerDefaults } from "@/lib/animations";

// 最新のお知らせ3件。Instagram由来・手動記事を区別せず同じデザインで表示する想定。
// 実運用では管理画面/連携から取得する。当面はモックデータ。
const NEWS = [
  {
    date: "2026.07.01",
    category: "お知らせ",
    title: "夏季休業期間のお知らせ",
    href: "/#news",
  },
  {
    date: "2026.06.15",
    category: "施工実績",
    title: "賃貸マンションのリノベーション事例を公開しました",
    href: "/#news",
  },
  {
    date: "2026.05.28",
    category: "Instagram",
    title: "現場の様子を更新しました",
    href: "/#news",
  },
];

export default function News() {
  const sectionRef = useScopedGsap<HTMLElement>(() => {
    gsap.from("[data-news-fade]", {
      opacity: 0,
      y: 24,
      duration: 1,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: "[data-news-head]",
        ...scrollTriggerDefaults,
      },
    });

    gsap.from("[data-news-row]", {
      opacity: 0,
      y: 22,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: "[data-news-list]",
        ...scrollTriggerDefaults,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="news"
      className="w-full bg-surface px-6 py-24 sm:px-10 lg:px-16 lg:py-32 xl:px-24"
    >
      <div className="mx-auto grid max-w-[1520px] grid-cols-1 gap-12 lg:grid-cols-[360px_1fr] lg:gap-20">
        <div data-news-head>
          <span
            data-news-fade
            className="block text-xs font-medium tracking-[0.25em] text-subtext"
          >
            NEWS
          </span>
          <h2
            data-news-fade
            className="mt-6 text-2xl font-medium leading-[1.6] text-foreground sm:text-3xl lg:text-[2.4rem]"
          >
            お知らせ
          </h2>
          <Link
            data-news-fade
            href="/#news"
            className="mt-8 inline-flex items-center gap-3 text-xs font-medium tracking-[0.2em] text-foreground transition-opacity hover:opacity-60"
          >
            一覧を見る
            <span aria-hidden className="inline-block h-px w-9 bg-foreground" />
          </Link>
        </div>

        <ul data-news-list className="flex flex-col">
          {NEWS.map((item) => (
            <li key={item.title} data-news-row className="border-t border-border last:border-b">
              <Link
                href={item.href}
                className="group flex flex-col gap-2 py-7 transition-opacity hover:opacity-60 sm:flex-row sm:items-center sm:gap-8"
              >
                <time className="text-xs font-normal tracking-[0.1em] text-subtext sm:w-24 sm:shrink-0">
                  {item.date}
                </time>
                <span className="w-fit border border-border px-3 py-1 text-[10px] font-normal tracking-[0.15em] text-subtext sm:shrink-0">
                  {item.category}
                </span>
                <span className="text-sm font-normal leading-relaxed text-foreground sm:text-base">
                  {item.title}
                </span>
                <span
                  aria-hidden
                  className="hidden text-foreground/40 transition-transform group-hover:translate-x-1 sm:ml-auto sm:block"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
