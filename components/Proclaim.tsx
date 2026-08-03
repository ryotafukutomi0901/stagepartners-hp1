"use client";

import Image from "next/image";
import Link from "next/link";
import { useScopedGsap, gsap, ScrollTrigger } from "@/hooks/useGsap";
import { scrollTriggerDefaults } from "@/lib/animations";

// 導入メッセージ: 地主さま・オーナーさまに向け、STAGE PARTNERSの役割を短く伝える。
const PARAGRAPHS = [
  ["不動産や建築を扱うということは、", "主役は私たちではない。"],
  ["主役は、", "その場所で挑戦する人たちだ。"],
  ["私たちは、その人たちが輝くための舞台を創る。"],
];

const IMAGES = [
  { src: "/proclaim-image-1.jpg", alt: "STAGE PARTNERSが手がける建物のエントランスから望む街並み" },
  { src: "/proclaim-image-2.jpg", alt: "STAGE PARTNERSが手がける建物のラウンジから望む街並み" },
];

export default function Proclaim() {
  const sectionRef = useScopedGsap<HTMLElement>(({ scope }) => {
    // レイアウト上の並び順(視覚的にどちらが先に見えるか)に合わせて発火順を変える。
    // - デスクトップ(lg以上): 画像とテキストが横並び → 画像リビール → テキストの順
    // - モバイル/タブレット: grid-cols-1でテキストが上・画像が下に積まれる
    //   → テキストが先に見えるので、テキスト → 画像リビールの順
    // タイミングの「間」自体は両者で揃え、順序だけを入れ替える。
    const mm = gsap.matchMedia();

    // matchMedia().add()は「渡した条件のうち少なくとも1つが現在trueでないと
    // コールバックが呼ばれない」仕様のため、isDesktopだけを渡すとモバイル/
    // タブレット幅では条件が常にfalseになり、コールバック自体が発火しない
    // (=アニメーションが一切登録されない)。isMobileも併せて渡し、
    // どちらか一方が必ずtrueになるようにする。
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

        const revealImage = (position?: gsap.Position) =>
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

        const revealText = (position?: gsap.Position) =>
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

        if (isDesktop) {
          revealImage();
          revealText("-=1.1");
        } else {
          revealText();
          revealImage("-=1.1");
        }
        tl.from("[data-proclaim-meta]", { opacity: 0, duration: 1 }, "-=0.6");
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

    // 2枚の写真を自動で交互にクロスフェード。「01 ── 02」の表示中インジケーターと連動させる。
    // OSの「視差効果を減らす」設定時は、切り替えずに1枚目を静止表示する。
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion) {
      const images = gsap.utils.toArray<HTMLElement>("[data-proclaim-image]");
      const dots = gsap.utils.toArray<HTMLElement>("[data-proclaim-dot]");

      if (images.length === 2 && dots.length === 2) {
        const crossfade = gsap.timeline({ repeat: -1, paused: true });
        const HOLD = 4.5;
        const FADE = 1.1;

        crossfade
          .to({}, { duration: HOLD })
          .to(images[0], { opacity: 0, duration: FADE, ease: "power1.inOut" })
          .to(images[1], { opacity: 1, duration: FADE, ease: "power1.inOut" }, "<")
          .to(dots[0], { opacity: 0.4, duration: 0.5 }, "<")
          .to(dots[1], { opacity: 1, duration: 0.5 }, "<")
          .to({}, { duration: HOLD })
          .to(images[1], { opacity: 0, duration: FADE, ease: "power1.inOut" })
          .to(images[0], { opacity: 1, duration: FADE, ease: "power1.inOut" }, "<")
          .to(dots[1], { opacity: 0.4, duration: 0.5 }, "<")
          .to(dots[0], { opacity: 1, duration: 0.5 }, "<");

        // 画面外にいる間は止めて無駄なCPU消費を避ける。
        ScrollTrigger.create({
          trigger: scope.current,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => crossfade.play(),
          onEnterBack: () => crossfade.play(),
          onLeave: () => crossfade.pause(),
          onLeaveBack: () => crossfade.pause(),
        });
      }
    }
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
                          ? // 他セクションのh2(text-2xl sm:text-3xl系)と揃えた強調サイズ。
                            // lg(1024px)ちょうどは左カラムが最も狭くなり、そのまま30pxだと
                            // 「その場所で挑戦する人たちだ。」が折り返して3行になる。
                            // lgだけ一段引き締め、カラムに余裕が出るxl以降で30pxへ戻す
                            // (vwクランプは幅によって不規則に伸縮するため使わない)。
                            "text-2xl font-medium leading-[1.5] text-foreground sm:text-3xl lg:text-[1.5rem] xl:text-3xl"
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
          className="media-mono relative h-[46vh] w-full overflow-hidden bg-[#161513] lg:h-[78vh]"
        >
          <div
            data-proclaim-parallax
            className="absolute inset-x-0 -top-[10%] -bottom-[10%]"
          >
            {IMAGES.map((image, i) => (
              <Image
                key={image.src}
                data-proclaim-image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover object-center"
                style={i === 0 ? undefined : { opacity: 0 }}
                priority={i === 0}
              />
            ))}
          </div>

          <div
            data-proclaim-meta
            className="absolute bottom-7 left-7 flex items-center gap-3 text-[11px] font-normal tracking-[0.25em] text-white/85"
          >
            <span data-proclaim-dot className="opacity-100">01</span>
            <span aria-hidden className="inline-block h-px w-9 bg-white/60" />
            <span data-proclaim-dot className="opacity-40">02</span>
          </div>
        </div>
      </div>
    </section>
  );
}
