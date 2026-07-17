"use client";

import Image from "next/image";
import { useScopedGsap, gsap } from "@/hooks/useGsap";
import { scrollTriggerDefaults } from "@/lib/animations";

// 会社概要ページ(/company)本体のコンテンツ。
// 数値・許認可番号は正式決定まで仮の値。決まり次第差し替える。
const PROFILE = [
  { label: "会社名", value: "株式会社STAGE PARTNERS" },
  { label: "代表者", value: "代表取締役　○○　○○" },
  { label: "設立", value: "20XX年○月" },
  { label: "所在地", value: "〒410-0055　静岡県沼津市高島本町16-16 高島本町ビル2F" },
  {
    label: "事業内容",
    value: "不動産事業（仲介・管理・買取再販）／ 建設事業（リフォーム）",
  },
  {
    label: "許認可",
    value: [
      "宅地建物取引業免許　静岡県知事（1）第14684号",
      "一般建設業登録　静岡県知事許可（般-6）第39891号",
      "一級建築士事務所　静岡県知事登録（2）第7830号",
    ],
  },
];

export default function Company() {
  const sectionRef = useScopedGsap<HTMLElement>(() => {
    gsap.from("[data-company-image]", {
      opacity: 0,
      scale: 1.06,
      duration: 1.4,
      ease: "power1.out",
      scrollTrigger: {
        trigger: "[data-company-image]",
        ...scrollTriggerDefaults,
      },
    });

    gsap.from("[data-company-text]", {
      opacity: 0,
      y: 24,
      duration: 1,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "[data-company-text]",
        ...scrollTriggerDefaults,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="company"
      className="w-full bg-background px-6 py-24 sm:px-10 lg:px-16 lg:py-32 xl:px-24"
    >
      <div className="mx-auto grid w-full max-w-[1520px] grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
        <div
          data-company-image
          className="media relative aspect-[4/3] overflow-hidden bg-[#161513] lg:aspect-[4/5]"
        >
          <Image
            src="/companyimage1.png"
            alt="STAGE PARTNERSの拠点と街並み"
            fill
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover object-[25%_center]"
          />
        </div>

        <div>
          <span
            data-company-text
            className="block text-xs font-medium tracking-[0.25em] text-subtext"
          >
            COMPANY
          </span>
          <h2
            data-company-text
            className="mt-6 text-2xl font-medium leading-[1.6] text-foreground sm:text-3xl lg:text-[2.4rem]"
          >
            会社概要
          </h2>

          <dl data-company-text className="mt-10 border-t border-border">
            {PROFILE.map((row) => (
              <div
                key={row.label}
                className="flex flex-col gap-1 border-b border-border py-5 sm:flex-row sm:gap-8"
              >
                <dt className="text-xs font-medium tracking-[0.15em] text-subtext sm:w-28 sm:shrink-0 sm:pt-1">
                  {row.label}
                </dt>
                <dd className="text-sm font-normal leading-relaxed text-foreground sm:text-base">
                  {Array.isArray(row.value)
                    ? row.value.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))
                    : row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
