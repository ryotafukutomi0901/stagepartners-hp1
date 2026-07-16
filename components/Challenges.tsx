"use client";

import Link from "next/link";
import { useScopedGsap, gsap } from "@/hooks/useGsap";
import { scrollTriggerDefaults } from "@/lib/animations";

// 地主さま・オーナーさま向けの課題提起。相談への入口をつくる。
const CONCERNS = [
  {
    index: "01",
    title: "空室が埋まらない",
    body: "募集しても入居が決まらない、稼働率が上がらない。収益の土台が揺らいでいる。",
  },
  {
    index: "02",
    title: "建物の老朽化",
    body: "外観や設備の傷みが目立ってきた。どこから、どこまで手を入れるべきか判断がつかない。",
  },
  {
    index: "03",
    title: "管理の負担",
    body: "入居者対応や日々の管理に手が回らない。任せられる相手が近くにいない。",
  },
  {
    index: "04",
    title: "改修費用が読めない",
    body: "リフォームすべきかどうか、いくらかかり、いくら戻るのか。費用対効果が見えない。",
  },
  {
    index: "05",
    title: "資産の活かし方",
    body: "貸すべきか、売るべきか、直して活かすべきか。土地と建物の次の一手に迷っている。",
  },
];

export default function Challenges() {
  const sectionRef = useScopedGsap<HTMLElement>(() => {
    gsap.from("[data-challenge-fade]", {
      opacity: 0,
      y: 26,
      duration: 1,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: "[data-challenge-head]",
        ...scrollTriggerDefaults,
      },
    });

    gsap.from("[data-challenge-card]", {
      opacity: 0,
      y: 30,
      duration: 0.9,
      ease: "power2.out",
      stagger: 0.09,
      scrollTrigger: {
        trigger: "[data-challenge-grid]",
        ...scrollTriggerDefaults,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-surface px-6 py-24 sm:px-10 lg:px-16 lg:py-32 xl:px-24"
    >
      <div className="mx-auto max-w-[1520px]">
        <div data-challenge-head className="max-w-2xl">
          <span
            data-challenge-fade
            className="block text-xs font-medium tracking-[0.25em] text-subtext"
          >
            YOUR CONCERNS
          </span>
          <h2
            data-challenge-fade
            className="mt-6 text-2xl font-medium leading-[1.6] text-foreground sm:text-3xl lg:text-[2.4rem]"
          >
            その土地と建物の悩み、
            <br />
            抱え込んでいませんか。
          </h2>
          <p
            data-challenge-fade
            className="mt-6 text-sm font-normal leading-loose text-subtext sm:text-base"
          >
            地主さま・オーナーさまが直面しやすい課題を、STAGE PARTNERSは不動産と建築の両面から解きほぐします。
          </p>
        </div>

        <div
          data-challenge-grid
          className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
        >
          {CONCERNS.map((concern) => (
            <div
              key={concern.index}
              data-challenge-card
              className="bg-surface px-7 py-9 transition-colors duration-300 hover:bg-background sm:px-8 sm:py-10"
            >
              <span className="block text-[11px] font-medium tracking-[0.25em] text-subtext">
                {concern.index}
              </span>
              <h3 className="mt-5 text-lg font-medium leading-snug text-foreground sm:text-xl">
                {concern.title}
              </h3>
              <p className="mt-4 text-sm font-normal leading-loose text-subtext">
                {concern.body}
              </p>
            </div>
          ))}

          {/* 相談への入口 */}
          <Link
            href="/#contact"
            data-challenge-card
            className="group flex flex-col justify-between bg-[#111111] px-7 py-9 text-white transition-colors duration-300 hover:bg-black sm:px-8 sm:py-10"
          >
            <span className="block text-[11px] font-medium tracking-[0.25em] text-white/60">
              CONTACT
            </span>
            <span className="mt-8 block">
              <span className="block text-lg font-medium leading-snug sm:text-xl">
                まずは、
                <br />
                話を聞いてほしい。
              </span>
              <span className="mt-6 inline-flex items-center gap-3 text-xs font-medium tracking-[0.2em] text-white/85 transition-opacity group-hover:opacity-70">
                無料で相談する
                <span aria-hidden>→</span>
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
