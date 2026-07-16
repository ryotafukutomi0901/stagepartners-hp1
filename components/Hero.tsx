"use client";

import Image from "next/image";
import Link from "next/link";
import { useScopedGsap, gsap, SplitText } from "@/hooks/useGsap";

export default function Hero() {
  // Heroはページ最上部で読み込み直後から必ず視界に入るため、ScrollTriggerで
  // スクロールを待つのではなく、マウント直後に一度だけ再生する入場アニメーションにしている。
  // ここが第一印象(離脱率)を左右するため、他セクションより強めの演出にしてある。
  const sectionRef = useScopedGsap<HTMLElement>(() => {
    const split = SplitText.create("[data-hero-line]", {
      type: "lines",
      mask: "lines",
    });

    const tl = gsap.timeline({ delay: 0.15 });

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
    gsap.to("[data-hero-image]", {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100svh] min-h-[560px] w-full items-center overflow-hidden bg-[#0d0d0d]"
    >
      {/* 全面に敷く背景画像(余白なし) */}
      <div className="media-static absolute inset-0">
        <Image
          data-hero-image
          src="/heroimage2.jpg"
          alt="STAGE PARTNERSが向き合う土地と建物"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
        />
      </div>
      {/* 可読性のためのグラデーションオーバーレイ */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1520px] px-6 sm:px-10 lg:px-16">
        <p
          data-hero-eyebrow
          className="text-[10px] font-normal tracking-[0.4em] text-white/70 sm:text-xs"
        >
          REAL ESTATE &amp; RENOVATION
        </p>

        <h1 className="mt-6 text-white">
          <span className="block overflow-hidden">
            <span
              data-hero-line
              className="block text-[2.6rem] font-medium leading-[1.28] tracking-[0.02em] sm:text-6xl lg:text-[5rem]"
            >
              土地と建物に、
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              data-hero-line
              className="block text-[2.6rem] font-medium leading-[1.28] tracking-[0.02em] sm:text-6xl lg:text-[5rem]"
            >
              次の価値を。
            </span>
          </span>
        </h1>

        <p
          data-hero-sub
          className="mt-8 max-w-xl text-sm font-normal leading-loose text-white/85 sm:text-base"
        >
          不動産の仲介・管理から、建物のリフォームまで。
          <br className="hidden sm:block" />
          地主さま・オーナーさまの資産の可能性を、一貫して引き出します。
        </p>

        <div data-hero-cta className="mt-11">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 bg-white px-9 py-4 text-xs font-medium tracking-[0.2em] text-[#111111] transition-opacity hover:opacity-80"
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
