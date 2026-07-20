// PageTransitionの幕(カーテン)開閉と、Heroなど「マウント直後に一度だけ再生する
// 入場アニメーション」を同期させるための橋渡し。
//
// 幕がまだ画面を覆っている間にHeroのアニメーションが終わってしまうと、
// 幕が開いた瞬間には既に静止した状態しか見えず、逆に幕が開いた後に
// 画像だけがズームし続けているように見えてしまう。これを防ぐため、
// 幕が開き始めるタイミングを合図として、Hero側はそれまで再生を待つ。
type Listener = () => void;

let isOpen = false;
let queued: Listener[] = [];

export function onCurtainOpen(listener: Listener): () => void {
  if (isOpen) {
    listener();
    return () => {};
  }
  queued.push(listener);
  return () => {
    queued = queued.filter((l) => l !== listener);
  };
}

export function notifyCurtainOpen() {
  isOpen = true;
  const listeners = queued;
  queued = [];
  listeners.forEach((listener) => listener());
}

export function notifyCurtainClosing() {
  isOpen = false;
}
