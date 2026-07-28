// 各セクションのScrollTriggerで共通して使う発火・巻き戻しの範囲。
// 個々のtween（opacity・y・duration・stagger）はセクションごとに演出の強弱を
// 変えているため共通化していない。ここで揃えるのは「いつ動き始めていつ戻すか」だけ。
export const scrollTriggerDefaults = {
  start: "top 80%",
  end: "bottom 20%",
  toggleActions: "play none none reverse",
} as const;
