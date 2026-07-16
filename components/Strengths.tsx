"use client";

import { useScopedGsap, gsap } from "@/hooks/useGsap";
import { scrollTriggerDefaults } from "@/lib/animations";

const STRENGTHS = [
  {
    index: "01",
    title: "不動産と建築の一体対応",
    body: "仲介・買取から改修、そして管理まで。窓口を分けずに一社で担うから、判断も対応も速い。",
  },
  {
    index: "02",
    title: "幅広い施工力",
    body: "小さな原状回復から一棟のリノベーションまで。住まいにも収益物件にも柔軟に応えます。",
  },
  {
    index: "03",
    title: "買って終わりにしない",
    body: "売買や改修の後も、維持管理で長く伴走。資産の価値を、その先まで守り続けます。",
  },
  {
    index: "04",
    title: "グループ基盤と許認可",
    body: "宅地建物取引業・建設業の許認可に裏打ちされた体制で、安心してお任せいただけます。",
  },
];

export default function Strengths() {
  const sectionRef = useScopedGsap<HTMLElement>(() => {
    gsap.from("[data-strength-fade]", {
      opacity: 0,
      y: 24,
      duration: 1,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: "[data-strength-head]",
        ...scrollTriggerDefaults,
      },
    });

    gsap.from("[data-strength-item]", {
      opacity: 0,
      y: 28,
      duration: 0.9,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: "[data-strength-list]",
        ...scrollTriggerDefaults,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#111111] px-6 py-24 text-white sm:px-10 lg:px-16 lg:py-32 xl:px-24"
    >
      <div className="mx-auto grid max-w-[1520px] grid-cols-1 gap-14 lg:grid-cols-[360px_1fr] lg:gap-20">
        <div data-strength-head>
          <span
            data-strength-fade
            className="block text-xs font-medium tracking-[0.25em] text-white/50"
          >
            OUR STRENGTHS
          </span>
          <h2
            data-strength-fade
            className="mt-6 text-2xl font-medium leading-[1.6] sm:text-3xl lg:text-[2.4rem]"
          >
            選ばれる、
            <br />
            4つの理由。
          </h2>
          <p
            data-strength-fade
            className="mt-6 max-w-sm text-sm font-normal leading-loose text-white/60 sm:text-base"
          >
            不動産と建築、その両方を知る会社だからこそ提供できる価値があります。
          </p>
        </div>

        <ul data-strength-list className="flex flex-col">
          {STRENGTHS.map((item) => (
            <li
              key={item.index}
              data-strength-item
              className="grid grid-cols-[auto_1fr] gap-6 border-t border-white/10 py-8 last:border-b sm:gap-10 sm:py-10"
            >
              <span className="text-sm font-normal tracking-[0.2em] text-white/40">
                {item.index}
              </span>
              <div>
                <h3 className="text-xl font-medium sm:text-2xl">{item.title}</h3>
                <p className="mt-4 max-w-xl text-sm font-normal leading-loose text-white/60 sm:text-base">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
