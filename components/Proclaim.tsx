"use client";

import Image from "next/image";
import Link from "next/link";
import { useScopedGsap, gsap } from "@/hooks/useGsap";
import { scrollTriggerDefaults } from "@/lib/animations";

// 導入メッセージ: 地主さま・オーナーさまに向け、STAGE PARTNERSの役割を短く伝える。
const PARAGRAPHS = [
  ["不動産や建築を扱うということは、", "主役は私たちではない。"],
  ["主役は、", "その場所で挑戦する人たちだ。"],
  ["私たちは、その人たちが輝くための舞台を創る。"],
];

export default function Proclaim() {
  const sectionRef = useScopedGsap<HTMLElement>(({ scope }) => {
    // レイアウトが左右2カラム(lg以上)か縦積み(モバイル)かで、
    // 視覚的な並び順に合わせて発火順を変える。
    // - デスクトップ: 画像が横に並ぶので、画像リビール → テキストの順
    // - モバイル: 文章が画像より上に来るので、テキスト → 画像リビールの順
    const mm = gsap.matchMedia();

    const imageReveal = (tl: gsap.core.Timeline, position?: gsap.Position) =>
      tl
        .fromTo(
          "[data-proclaim-image-wrap]",
          { clipPath: "inset(0% 100% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.4,
            ease: "power4.inOut",
          },
          position,
        )
        .from(
          "[data-proclaim-image]",
          { scale: 1.22, duration: 2, ease: "power2.out" },
          "<",
        );

    const textReveal = (tl: gsap.core.Timeline, position?: gsap.Position) =>
      tl
        .from(
          "[data-proclaim-line]",
          { yPercent: 115, duration: 1.8, ease: "expo.out", stagger: 0.12 },
          position,
        )
        .from(
          "[data-proclaim-sub]",
          { opacity: 0, y: 24, duration: 0.9, ease: "power3.out" },
          "-=0.5",
        );

    mm.add(
      { isDesktop: "(min-width: 1024px)", isMobile: "(max-width: 1023px)" },
      (context) => {
        const isDesktop = context.conditions?.isDesktop ?? false;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scope.current,
            ...scrollTriggerDefaults,
          },
        });

        if (isDesktop) {
          imageReveal(tl);
          textReveal(tl, "-=1.1");
          tl.from("[data-proclaim-meta]", { opacity: 0, duration: 1 }, "-=0.6");
        } else {
          textReveal(tl);
          imageReveal(tl, "-=0.3");
          tl.from("[data-proclaim-meta]", { opacity: 0, duration: 1 }, "-=0.8");
        }
      },
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
      <div className="mx-auto grid w-full max-w-[1520px] grid-cols-1 items-center gap-14 px-6 py-24 sm:px-10 lg:grid-cols-[0.72fr_1fr] lg:gap-16 lg:py-0 lg:px-16">
        <div className="max-w-lg lg:ml-8">
          <span className="block text-xs font-medium tracking-[0.25em] text-subtext">
            MESSAGE
          </span>
          <h2 className="mt-8">
            {PARAGRAPHS.map((lines, i) => (
              <span key={i} className={`block ${i > 0 ? "mt-6" : ""}`}>
                {lines.map((line) => (
                  <span key={line} className="block overflow-hidden">
                    <span
                      data-proclaim-line
                      className={`block ${i === 1
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

          <div data-proclaim-sub className="mt-12">
            <Link
              href="/company"
              className="inline-flex items-center gap-3 bg-foreground px-9 py-4 text-xs font-medium tracking-[0.2em] text-background transition-opacity hover:opacity-80"
            >
              私たちについて
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div
          data-proclaim-image-wrap
          className="media relative h-[46vh] w-full overflow-hidden bg-[#161513] lg:h-[78vh]"
        >
          <div
            data-proclaim-parallax
            className="absolute inset-x-0 -top-[10%] -bottom-[10%]"
          >
            <Image
              data-proclaim-image
              src="/heroimage1.png"
              alt="STAGE PARTNERSが向き合う街並みと建物"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover object-[40%_center]"
            />
          </div>

          <div
            data-proclaim-meta
            className="absolute bottom-7 left-7 flex items-center gap-3 text-[11px] font-normal tracking-[0.25em] text-white/85"
          >
            <span>01</span>
            <span aria-hidden className="inline-block h-px w-9 bg-white/60" />
            <span>02</span>
          </div>
        </div>
      </div>
    </section>
  );
}
