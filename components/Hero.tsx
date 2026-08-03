"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScopedGsap, gsap, SplitText } from "@/hooks/useGsap";
import { onCurtainOpen } from "@/lib/curtain";

export default function Hero() {
  // Heroはページ最上部で読み込み直後から必ず視界に入るため、ScrollTriggerで
  // スクロールを待つのではなく、マウント直後に一度だけ再生する入場アニメーションにしている。
  // ここが第一印象(離脱率)を左右するため、他セクションより強めの演出にしてある。
  //
  // ただしマウント自体はPageTransitionの幕(ローディング演出)がまだ画面を
  // 覆っている間に起きるため、即再生すると幕が開く頃には演出が終わっている。
  // 幕が開き始める合図(onCurtainOpen)を待ってから再生する。
  const sectionRef = useScopedGsap<HTMLElement>(({ scope }) => {
    const split = SplitText.create("[data-hero-line]", {
      type: "lines",
      mask: "lines",
    });

    const tl = gsap.timeline({ id: "hero-intro", paused: true, delay: 0.15 });

    tl.from("[data-hero-image]", {
      scale: 1.2,
      duration: 2.4,
      ease: "power2.out",
    })
      .from(
        "[data-hero-eyebrow]",
        { opacity: 0, y: 16, duration: 0.9, ease: "power2.out" },
        "-=1.9",
      )
      .from(
        split.lines,
        {
          yPercent: 120,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.14,
        },
        "-=1.6",
      )
      .from(
        "[data-hero-sub]",
        { opacity: 0, y: 20, duration: 0.9, ease: "power2.out" },
        "-=0.7",
      )
      .from(
        "[data-hero-cta]",
        { opacity: 0, y: 16, duration: 0.8, ease: "power2.out" },
        "-=0.6",
      )
      .from(
        "[data-hero-cue]",
        { opacity: 0, duration: 0.8, ease: "power1.out" },
        "-=0.4",
      );

    gsap.to("[data-hero-cue] span", {
      y: 8,
      duration: 1.4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    // スクロールで背景画像を僅かにパララックスさせる
    const slides = gsap.utils.toArray<HTMLElement>("[data-hero-slide]");
    let slideTimer: number | undefined;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && slides.length > 1) {
      let current = 0;
      slideTimer = window.setInterval(() => {
        const next = (current + 1) % slides.length;
        gsap.fromTo(slides[next], { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 1.4, ease: "power2.inOut" });
        gsap.to(slides[current], { opacity: 0, duration: 1.4, ease: "power2.inOut" });
        current = next;
      }, 5600);
    }

    gsap.to("[data-hero-image]", {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: scope.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      if (slideTimer) window.clearInterval(slideTimer);
    };
  }, []);

  useEffect(() => onCurtainOpen(() => gsap.getById("hero-intro")?.play()), []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100svh] min-h-[560px] w-full items-center overflow-hidden bg-[#102d40]"
    >
      {/* 全面に敷く背景画像(余白なし) */}
      <div data-hero-image className="absolute inset-0">
        {[
          { src: "/stagepartners-hero.jpg", position: "object-center" },
          { src: "/constructimage1.jpg", position: "object-center" },
          { src: "/real-estateimage1.png", position: "object-[60%_center]" },
        ].map((slide, index) => (
          <div key={slide.src} data-hero-slide className={`absolute inset-0 ${index === 0 ? "opacity-100" : "opacity-0"}`}>
            <Image
              src={slide.src}
              alt={index === 0 ? "STAGE PARTNERSが向き合う沼津の土地と建物" : ""}
              fill
              sizes="100vw"
              priority={index === 0}
              className={`object-cover ${slide.position}`}
            />
          </div>
        ))}
      </div>
      {/* 可読性のためのグラデーションオーバーレイ */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[#102d40]/70 via-[#102d40]/38 to-[#102d40]/82"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1520px] px-6 sm:px-10 lg:px-16">
        <p
          data-hero-eyebrow
          className="text-[10px] font-normal tracking-[0.4em] text-white/70 sm:text-xs"
        >
          REAL ESTATE &amp; ARCHITECTURE
        </p>

        <h1 className="mt-6 text-white">
          <span className="block overflow-hidden">
            <span
              data-hero-line
              className="block text-[2.25rem] font-medium leading-[1.3] tracking-[0.02em] sm:text-[3.5rem] lg:text-[4.25rem]"
            >
              挑戦する人が、
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              data-hero-line
              className="block text-[2.25rem] font-medium leading-[1.3] tracking-[0.02em] sm:text-[3.5rem] lg:text-[4.25rem]"
            >
              輝ける場所を。
            </span>
          </span>
        </h1>

        <p
          data-hero-sub
          className="mt-8 max-w-xl text-sm font-normal leading-loose text-white/85 sm:text-base"
        >
          不動産の仲介・管理から、建物のリフォーム・改修まで。
          <br className="hidden sm:block" />
          沼津を拠点に、地主さま・オーナーさまの資産の可能性を、一貫して引き出します。
        </p>

        <div data-hero-cta className="mt-11">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-brand px-9 py-4 text-xs font-medium tracking-[0.2em] text-white transition-colors hover:bg-[#f0844d]"
          >
            無料で相談する
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <div
        data-hero-cue
        aria-hidden
        className="pointer-events-none absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-normal tracking-[0.35em] text-white/80"
      >
        <span className="inline-block">SCROLL</span>
      </div>
    </section>
  );
}
