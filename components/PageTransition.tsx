"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/hooks/useGsap";
import { notifyCurtainClosing, notifyCurtainOpen } from "@/lib/curtain";

const EASE = "power4.inOut";

// カーテン(シャッター)の開閉で場面転換を表現する。
// - 閉: clip-pathの下端が0%→100%へ伸び、上から画面全体を覆う
// - 開: 下端が100%→0%へ戻り、覆いが上へ抜けて舞台(ページ)が現れる
const COVERED = "inset(0% 0% 0% 0%)";
const HIDDEN = "inset(0% 0% 100% 0%)";

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // 直前のpathnameとの比較で「実際にルートが変わったか」を判定するための参照値。
  const prevPathnameRef = useRef<string | null>(null);
  // close()でオーバーレイを閉じてから遷移するまでの間、trueにしておく。
  const pendingRef = useRef(false);

  const showMark = () => {
    gsap.killTweensOf([markRef.current, lineRef.current]);
    gsap.fromTo(
      markRef.current,
      { opacity: 0, scale: 0.94 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
    );
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, ease: "power3.inOut", delay: 0.15 },
    );
  };

  const hideMark = () => {
    gsap.killTweensOf([markRef.current, lineRef.current]);
    gsap.to([markRef.current, lineRef.current], {
      opacity: 0,
      duration: 0.3,
      ease: "power1.in",
    });
  };

  const close = (onComplete?: () => void) => {
    if (!overlayRef.current) return;
    notifyCurtainClosing();
    gsap.set(overlayRef.current, { display: "flex", pointerEvents: "auto" });
    showMark();
    gsap.fromTo(
      overlayRef.current,
      { clipPath: HIDDEN },
      { clipPath: COVERED, duration: 0.75, ease: EASE, onComplete },
    );
  };

  const open = () => {
    if (!overlayRef.current) return;
    hideMark();
    // 幕が開き始める合図。Hero等の入場アニメーションはこれを待って再生する
    // ことで、幕の下で終わってしまったり反対に開いた後だけ動いて見えたり
    // しないようにする。
    notifyCurtainOpen();
    gsap.to(overlayRef.current, {
      clipPath: HIDDEN,
      duration: 1,
      ease: EASE,
      delay: 0.3,
      onComplete: () => {
        gsap.set(overlayRef.current, { display: "none", pointerEvents: "none" });
      },
    });
  };

  // 初回ロード: すでに画面全体を覆った状態からロゴを見せ、その後カーテンを開ける。
  useEffect(() => {
    prevPathnameRef.current = pathname;
    showMark();
    const timer = window.setTimeout(() => open(), 550);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ルート遷移完了(pathname変化)を検知してカーテンを開ける。
  useEffect(() => {
    if (prevPathnameRef.current === pathname) return;
    prevPathnameRef.current = pathname;
    if (!pendingRef.current) return;
    pendingRef.current = false;
    requestAnimationFrame(() => open());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // サイト内リンクのクリックを横取りし、カーテンを閉じてから遷移する。
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement)?.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      // 同一ページ内のアンカー移動(例: /#news)はカーテンの対象にしない。
      if (url.pathname === window.location.pathname) return;

      e.preventDefault();
      pendingRef.current = true;
      close(() => {
        router.push(`${url.pathname}${url.search}${url.hash}`);
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <div
      ref={overlayRef}
      aria-hidden
      data-page-transition
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#111111]"
      style={{ clipPath: COVERED }}
    >
      <div ref={markRef} className="flex flex-col items-center gap-4 opacity-0">
        <Image
          src="/logo-mono-white.png"
          alt=""
          width={280}
          height={68}
          priority
          className="h-8 w-auto sm:h-9"
        />
        <span
          ref={lineRef}
          className="block h-px w-16 origin-left scale-x-0 bg-brand"
        />
      </div>
    </div>
  );
}
