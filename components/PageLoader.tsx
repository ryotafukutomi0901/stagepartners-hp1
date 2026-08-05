"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/hooks/useGsap";
import { markStageRevealed, prefersReducedMotion } from "@/lib/animations";

/**
 * ローディング/ページ遷移の幕(仕様書4.2の「舞台」モチーフ)。
 *
 * 初回ロードと、ページ遷移(次階層への移動・下層からTOPへの復帰)のたびに、
 * ネイビーの幕がロゴを見せてから上へ引き上がり、下のページを現す。
 * 社名の STAGE に合わせ「緞帳が上がる」動きにしつつ、
 * 水平の基準線(地平線・基礎)と製図のような枠で不動産・建築らしさを出す。
 *
 * 実装上の要点:
 * - 初期状態(SSR)から幕は閉じているため、JS適用前に中身が見えてしまうことがない。
 * - 遷移時は useLayoutEffect(描画前)で幕を閉じ直すので、新ページが一瞬見える現象を防ぐ。
 * - 幕が出ている間は背面をスクロールさせない。終了後は pointer-events を切って操作を妨げない。
 */
export default function PageLoader() {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const isFirstLoad = useRef(true);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const intro = isFirstLoad.current;
    isFirstLoad.current = false;

    const q = gsap.utils.selector(panel);
    const unlock = () => {
      document.body.style.overflow = "";
      gsap.set(panel, { pointerEvents: "none", visibility: "hidden" });
    };

    // 初回ロード・遷移とも、必ず「幕が閉じた状態」から始める
    gsap.set(panel, {
      clipPath: "inset(0% 0% 0% 0%)",
      pointerEvents: "auto",
      visibility: "visible",
    });
    document.body.style.overflow = "hidden";

    if (prefersReducedMotion()) {
      gsap.set(q("[data-loader-item]"), { opacity: 1, y: 0 });
      gsap.set(q("[data-loader-rule]"), { scaleX: 1 });
      const tl = gsap.timeline({
        onComplete: () => {
          unlock();
          markStageRevealed();
        },
      });
      tl.to(panel, { opacity: 0, duration: 0.25, delay: 0.2 }).set(panel, {
        opacity: 1,
      });
      return () => {
        tl.kill();
        unlock();
        markStageRevealed();
      };
    }

    const tl = gsap.timeline({ onComplete: unlock });

    // 幕の中身: ロゴ → 基準線 → ラベル
    tl.fromTo(
      q("[data-loader-item]"),
      { opacity: 0, y: 14 },
      {
        opacity: 1,
        y: 0,
        duration: intro ? 0.8 : 0.5,
        stagger: intro ? 0.12 : 0.07,
        ease: "power2.out",
      },
    )
      .fromTo(
        q("[data-loader-rule]"),
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: intro ? 1 : 0.6,
          ease: "power3.inOut",
        },
        intro ? "-=0.55" : "-=0.35",
      )
      // 中身を先に消してから幕を上げる(文字が動きながら切れるのを避ける)
      .to(
        q("[data-loader-content]"),
        { opacity: 0, duration: 0.35, ease: "power2.in" },
        intro ? "+=0.25" : "+=0.05",
      )
      // 緞帳が上がる
      .to(
        panel,
        {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: intro ? 1.1 : 0.9,
          ease: "power4.inOut",
        },
        "-=0.1",
      )
      // 幕が上がり切る前に合図を出し、下のページの導入と重ねる
      .add(markStageRevealed, "<0.3");

    return () => {
      tl.kill();
      unlock();
      markStageRevealed();
    };
  }, [pathname]);

  return (
    <div
      ref={panelRef}
      aria-hidden
      className="page-loader fixed inset-0 z-[90] flex items-center justify-center bg-navy"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      {/* JSが無効な環境で幕が残り続けないようにする */}
      <noscript>
        <style>{`.page-loader{display:none !important}`}</style>
      </noscript>

      {/* 製図のような内枠 */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-4 border border-on-dark/15 sm:inset-6 lg:inset-8"
      />

      <div
        data-loader-content
        className="relative flex flex-col items-center gap-7 px-8"
      >
        <Image
          data-loader-item
          src="/logo-mono-white.png"
          alt=""
          width={400}
          height={97}
          priority
          className="h-8 w-auto sm:h-10"
        />

        {/* 地平線/基礎を引くような水平線 */}
        <span
          data-loader-rule
          aria-hidden
          className="block h-px w-40 origin-center bg-on-dark/45 sm:w-56"
        />

        <span
          data-loader-item
          className="font-latin text-[9px] tracking-[0.4em] text-on-dark/55 sm:text-[10px]"
        >
          REAL ESTATE &amp; ARCHITECTURE
        </span>
      </div>
    </div>
  );
}
