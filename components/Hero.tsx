"use client";

import Image from "next/image";
import { useScopedGsap, gsap, SplitText } from "@/hooks/useGsap";

export default function Hero() {
  // Heroはページ最上部で読み込み直後から必ず視界に入るため、ScrollTriggerで
  // スクロールを待つのではなく、マウント直後に一度だけ再生する入場アニメーションにしている。
  // ここが第一印象(離脱率)を左右するセクションなので、他セクションより強めの演出にしてある。
  const sectionRef = useScopedGsap<HTMLElement>(() => {
    const split = SplitText.create("[data-hero-title]", {
      type: "chars",
      mask: "chars",
    });

    const tl = gsap.timeline({ delay: 0.2 });

    tl.from(split.chars, {
      yPercent: 120,
      rotate: 6,
      duration: 1,
      ease: "expo.out",
      stagger: 0.028,
    })
      .fromTo(
        "[data-hero-image-wrap]",
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.3,
          ease: "power4.inOut",
        },
        "-=0.5",
      )
      .from(
        "[data-hero-image]",
        { scale: 1.28, duration: 2.6, ease: "power2.out" },
        "<",
      )
      .from(
        "[data-hero-cue]",
        { opacity: 0, duration: 0.8, ease: "power1.out" },
        "-=0.4",
      );

    gsap.to("[data-hero-cue]", {
      y: 8,
      duration: 1.4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    gsap.to("[data-hero-image]", {
      yPercent: 6,
      ease: "none",
      scrollTrigger: {
        trigger: "[data-hero-image-wrap]",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex w-full flex-col items-center overflow-hidden bg-background pt-20 pb-0 sm:pt-28 lg:pt-32"
    >
      <div className="mx-auto w-full max-w-[1520px] px-6 text-center sm:px-10 lg:px-16">
        <h1
          data-hero-title
          className="[font-family:var(--font-amiri-quran)] text-[2.4rem] font-normal capitalize leading-[1.5] tracking-[0.01em] text-foreground sm:text-[3.2rem] lg:text-[4.25rem]"
        >
          CREATE A YOUR STAGE
        </h1>
      </div>

      <div
        data-hero-image-wrap
        className="relative mx-auto mt-16 h-[60vh] w-full max-w-[1200px] overflow-hidden bg-[#161513] sm:mt-20 sm:h-[70vh] lg:h-[85vh]"
      >
        <Image
          data-hero-image
          src="/heroimage2.jpg"
          alt="STAGE PARTNERSが見据える街の風景"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center brightness-[0.92] saturate-[0.75]"
        />
      </div>

      <div
        data-hero-cue
        aria-hidden
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] font-normal tracking-[0.35em] text-white/85"
      >
        SCROLL
      </div>
    </section>
  );
}
