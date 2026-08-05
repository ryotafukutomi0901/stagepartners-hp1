import gsap from "gsap";

export const EASE = "power2.out";
export const EASE_SOFT = "power1.out";
export const EASE_REVEAL = "expo.out";

/**
 * スクロール連動アニメーションの共通トリガー。
 *
 * start はビューポート幅に応じて可変にする。モバイル/タブレットは画面が短いため、
 * PCと同じ割合(78%)では要素が画面に入った瞬間に発火し、読み始める前に
 * アニメーションが終わってしまう。狭い画面ほど割合を小さく(＝発火を遅く)して、
 * 要素が十分に見えてから動き出すようにする。
 * ScrollTriggerはstartに関数を渡すとrefresh時(リサイズ・画面回転を含む)に再評価する。
 */
export const scrollTriggerDefaults = {
  start: () => {
    const w = window.innerWidth;
    if (w < 640) return "top 66%"; // スマートフォン
    if (w < 1024) return "top 70%"; // タブレット
    return "top 78%"; // PC
  },
  toggleActions: "play none none none",
} as const;

/**
 * 動きの低減設定(WCAG 2.2 / 仕様書4.2・13.2)。
 *
 * 各セクションの gsap コールバック冒頭でこれを見て早期 return する。
 * gsap.from() は「開始値を作ってから戻す」性質上、途中で止めると要素が
 * 隠れたままになりうるため、無効化ではなく最初から実行しない方針を採る。
 */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * 幕(PageLoader)が上がりきったことを知らせる合図。
 *
 * ファーストビューの導入アニメーションが幕の裏で進行し、
 * 幕が上がったときには既に終わっている、という事態を防ぐために使う。
 * スクロール連動のセクションは画面外から始まるため、この合図を必要としない。
 */
const REVEAL_EVENT = "stage:reveal";

/** 幕が上がる時点で呼ぶ。購読中のセクションが導入アニメーションを開始する。 */
export function markStageRevealed(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(REVEAL_EVENT));
}

/**
 * 幕が上がる合図でcallbackを実行する。戻り値は購読解除。
 *
 * 購読はセクションのマウント時に行われ、幕(PageLoader)のエフェクトは
 * その後に走るため、合図を取りこぼさない(Reactは子のエフェクトを先に実行する)。
 * 万一合図が届かない場合でもファーストビューが静止したままにならないよう、
 * 保険のタイマーを併用し、どちらか早い方で一度だけ実行する。
 */
export function onStageReveal(
  callback: () => void,
  fallbackMs = 4000,
): () => void {
  if (typeof window === "undefined") return () => {};

  let done = false;

  const run = () => {
    if (done) return;
    done = true;
    window.removeEventListener(REVEAL_EVENT, run);
    callback();
  };

  const timer = setTimeout(run, fallbackMs);
  window.addEventListener(REVEAL_EVENT, run);

  return () => {
    done = true; // 解除後にタイマーが発火しても何もしない
    window.removeEventListener(REVEAL_EVENT, run);
    clearTimeout(timer);
  };
}

export function fadeUp(
  target: gsap.TweenTarget,
  vars?: gsap.TweenVars,
): gsap.core.Tween {
  return gsap.from(target, {
    opacity: 0,
    y: 32,
    duration: 1,
    ease: EASE,
    ...vars,
  });
}

export function staggerFadeUp(
  target: gsap.TweenTarget,
  vars?: gsap.TweenVars,
): gsap.core.Tween {
  return gsap.from(target, {
    opacity: 0,
    y: 24,
    duration: 0.9,
    ease: EASE,
    stagger: 0.12,
    ...vars,
  });
}

export function imageReveal(
  target: gsap.TweenTarget,
  vars?: gsap.TweenVars,
): gsap.core.Tween {
  return gsap.from(target, {
    opacity: 0,
    scale: 1.08,
    duration: 1.4,
    ease: EASE_SOFT,
    ...vars,
  });
}

/** 罫線を左から引く。図面が引かれるような所作を各セクションの見出しに共通で与える。 */
export function drawLine(
  target: gsap.TweenTarget,
  vars?: gsap.TweenVars,
): gsap.core.Tween {
  return gsap.from(target, {
    scaleX: 0,
    transformOrigin: "left center",
    duration: 1.1,
    ease: "power3.inOut",
    ...vars,
  });
}
