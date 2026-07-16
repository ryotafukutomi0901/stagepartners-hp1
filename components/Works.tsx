"use client";

import Image from "next/image";
import { useScopedGsap, gsap } from "@/hooks/useGsap";
import { scrollTriggerDefaults } from "@/lib/animations";

// 注目の施工実績。管理画面で手動選択する想定のため、当面はモックの3件を掲載する。
// 実写・実績が用意でき次第、image と各テキストを差し替える。
const WORKS = [
  {
    category: "RENOVATION",
    title: "賃貸マンション 全面リノベーション",
    place: "東京都",
    image: "/real-estateimage1.png",
    position: "object-[60%_70%]",
  },
  {
    category: "REAL ESTATE",
    title: "戸建て 買取・再販リフォーム",
    place: "神奈川県",
    image: "/constructimage1.jpg",
    position: "object-center",
  },
  {
    category: "RENOVATION",
    title: "収益物件 原状回復・改修",
    place: "東京都",
    image: "/companyimage1.png",
    position: "object-[30%_center]",
  },
];

export default function Works() {
  const sectionRef = useScopedGsap<HTMLElement>(() => {
    gsap.from("[data-works-fade]", {
      opacity: 0,
      y: 24,
      duration: 1,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: "[data-works-head]",
        ...scrollTriggerDefaults,
      },
    });

    gsap.from("[data-works-card]", {
      opacity: 0,
      y: 30,
      duration: 0.9,
      ease: "power2.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: "[data-works-grid]",
        ...scrollTriggerDefaults,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-background px-6 py-24 sm:px-10 lg:px-16 lg:py-32 xl:px-24"
    >
      <div className="mx-auto max-w-[1520px]">
        <div
          data-works-head
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span
              data-works-fade
              className="block text-xs font-medium tracking-[0.25em] text-subtext"
            >
              WORKS
            </span>
            <h2
              data-works-fade
              className="mt-6 text-2xl font-medium leading-[1.6] text-foreground sm:text-3xl lg:text-[2.4rem]"
            >
              施工実績
            </h2>
          </div>
          <p
            data-works-fade
            className="max-w-sm text-sm font-normal leading-loose text-subtext sm:text-base"
          >
            土地と建物に価値を加えてきた、私たちの仕事の一部をご紹介します。
          </p>
        </div>

        <div
          data-works-grid
          className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
        >
          {WORKS.map((work) => (
            <article key={work.title} data-works-card>
              <div className="media relative aspect-[4/3] w-full overflow-hidden bg-[#161513]">
                <Image
                  src={work.image}
                  alt={`${work.title}の施工実績`}
                  fill
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                  className={`object-cover ${work.position}`}
                />
              </div>
              <span className="mt-6 block text-[11px] font-medium tracking-[0.25em] text-subtext">
                {work.category}
              </span>
              <h3 className="mt-3 text-lg font-medium leading-snug text-foreground sm:text-xl">
                {work.title}
              </h3>
              <p className="mt-2 text-xs font-normal tracking-[0.1em] text-subtext">
                {work.place}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
