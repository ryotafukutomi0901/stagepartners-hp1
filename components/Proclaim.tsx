"use client";

import Image from "next/image";
import { useScopedGsap, gsap } from "@/hooks/useGsap";
import { scrollTriggerDefaults } from "@/lib/animations";

const PROCLAIM_PARAGRAPHS = [
  ["不動産や建築を扱うということは、", "主役は私たちではない。"],
  ["主役は、", "その場所で挑戦する人たちだ。"],
  ["私たちは、その人たちが輝くための舞台を創る。"],
];

export default function Proclaim() {
  // scope要素(section自身)を基準にパララックスさせるため、文字列セレクタではなく
  // scope.current を直接 ScrollTrigger の trigger に渡す。
  // Companyセクションより力強い演出にするため、マスク付きの行リビール(下から迫り上がる)と
  // 画像のクリップワイプを組み合わせている(Heroの入場演出と同系統の「効かせ技」)。
  const sectionRef = useScopedGsap<HTMLElement>(({ scope }) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope.current,
        ...scrollTriggerDefaults,
      },
    });

    tl.fromTo(
      "[data-proclaim-image-wrap]",
      { clipPath: "inset(0% 100% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power4.inOut" },
    )
      .from(
        "[data-proclaim-image]",
        { scale: 1.22, duration: 2, ease: "power2.out" },
        "<",
      )
      .from(
        "[data-proclaim-line]",
        {
          yPercent: 115,
          duration: 1.8,
          ease: "expo.out",
          stagger: 0.12,
        },
        "-=1.1",
      )
      .from(
        "[data-proclaim-sub]",
        { opacity: 0, y: 24, duration: 0.9, ease: "power3.out" },
        "-=0.5",
      )
      .from(
        "[data-proclaim-meta]",
        { opacity: 0, duration: 1 },
        "-=0.6",
      );

    gsap.to("[data-proclaim-parallax]", {
      yPercent: 8,
      ease: "none",
      scrollTrigger: {
        trigger: scope.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[92vh] w-full items-stretch overflow-hidden bg-background"
    >
      <div
        data-proclaim-meta
        className="pointer-events-none absolute bottom-14 left-6 z-10 hidden [writing-mode:vertical-rl] text-[10px] font-normal tracking-[0.35em] text-subtext sm:left-10 md:block lg:left-16"
      >
        SCROLL
      </div>

      <div className="mx-auto grid w-full max-w-[1520px] grid-cols-1 items-center gap-14 px-6 py-20 sm:px-10 lg:grid-cols-[0.72fr_1fr] lg:gap-16 lg:py-0 lg:px-16">
        <div className="max-w-lg">
          <h2>
            {PROCLAIM_PARAGRAPHS.map((lines, i) => (
              <span key={i} className={`block ${i > 0 ? "mt-6" : ""}`}>
                {lines.map((line) => (
                  <span key={line} className="block overflow-hidden">
                    <span
                      data-proclaim-line
                      className={`block ${line === "主役は、" || line === "その場所で挑戦する人たちだ。"
                        ? "text-2xl font-medium leading-[1.7] text-foreground sm:text-3xl"
                        : "text-sm font-normal leading-loose text-subtext sm:text-base"
                        }`}
                    >
                      {line}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </h2>

          <a
            data-proclaim-sub
            href="#company"
            className="mt-12 inline-flex items-center gap-4 text-xs font-medium tracking-[0.2em] text-foreground transition-opacity hover:opacity-60"
          >
            私たちの想い
            <span aria-hidden className="inline-block h-px w-9 bg-foreground" />
          </a>
        </div>

        <div
          data-proclaim-image-wrap
          className="relative h-[46vh] w-full overflow-hidden bg-[#161513] lg:h-[78vh]"
        >
          <div
            data-proclaim-parallax
            className="absolute inset-x-0 -top-[10%] -bottom-[10%]"
          >
            <Image
              data-proclaim-image
              src="/heroimage1.png"
              alt="STAGE PARTNERSが手がける建築空間"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover object-[40%_center] contrast-[1.2] brightness-[0.8]"
            />
          </div>

          <div
            data-proclaim-meta
            className="absolute bottom-7 left-7 flex items-center gap-3 text-[11px] font-normal tracking-[0.25em] text-white/85"
          >
            <span>01</span>
            <span aria-hidden className="inline-block h-px w-9 bg-white/60" />
            <span>03</span>
          </div>
        </div>
      </div>
    </section>
  );
}
