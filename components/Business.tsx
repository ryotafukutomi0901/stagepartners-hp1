"use client";

import Image from "next/image";
import Link from "next/link";
import { useScopedGsap, gsap } from "@/hooks/useGsap";
import { scrollTriggerDefaults } from "@/lib/animations";

// 実際の建築・不動産の写真が用意でき次第、各 image のパスだけ差し替えれば反映されます。
// (現在はモックとして共通の仮画像を使用しています)
// href先のページは制作予定のため、現時点では未作成(アクセスすると404になります)
const DIVISIONS = [
  {
    index: "01",
    title: "建築ソリューション",
    description:
      "住まいから商業施設まで、企画・設計・監理を一貫して手がけ、お客様の期待と想いを形にします。",
    image: "/constructimage1.jpg",
    imagePosition: "object-center",
    href: "/construction",
  },
  {
    index: "02",
    title: "不動産ソリューション",
    description:
      "売買・賃貸・管理まで、暮らしと事業の基盤となる不動産をトータルにサポートし、確かな価値へとつなぎます。",
    image: "/real-estateimage1.png",
    imagePosition: "object-[70%_80%]",
    href: "/real-estate",
  },
];

export default function Business() {
  const sectionRef = useScopedGsap<HTMLElement>(() => {
    gsap.from("[data-business-fade]", {
      opacity: 0,
      y: 26,
      duration: 1,
      ease: "power2.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: "[data-business-intro]",
        ...scrollTriggerDefaults,
      },
    });

    const cards = gsap.utils.toArray<HTMLElement>("[data-business-card]");
    cards.forEach((card) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          ...scrollTriggerDefaults,
        },
      });

      tl.from(card.querySelector("[data-business-image]"), {
        opacity: 0,
        scale: 1.08,
        duration: 1.3,
        ease: "power1.out",
      }).from(
        card.querySelectorAll("[data-business-text]"),
        {
          opacity: 0,
          y: 18,
          duration: 0.9,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.7",
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="business"
      className="w-full bg-background px-6 py-28 sm:px-10 lg:px-16 lg:py-36 xl:px-24"
    >
      <div className="mx-auto max-w-[1520px]">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[280px_1fr] lg:gap-16">
          <div data-business-intro>
            <span
              data-business-fade
              className="block text-xs font-medium tracking-[0.25em] text-subtext"
            >
              OUR SOLUTIONS
            </span>
            <h2
              data-business-fade
              className="mt-6 text-2xl font-medium leading-[1.7] text-foreground sm:text-3xl"
            >
              事業内容
            </h2>
            <p
              data-business-fade
              className="mt-6 text-sm font-normal leading-loose text-subtext sm:text-base"
            >
              積み重ねてきた経験と確かな知見で
              <br />
              土地と建物に深く向き合い、価値ある選択と創造を支えます。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:gap-14">
            {DIVISIONS.map((division) => (
              <div key={division.index} data-business-card>
                <div
                  data-business-image
                  className="relative aspect-[4/3] w-full overflow-hidden bg-[#161513]"
                >
                  <Image
                    src={division.image}
                    alt={`${division.title}のイメージ`}
                    fill
                    sizes="(min-width: 1024px) 32vw, 100vw"
                    className={`object-cover ${division.imagePosition}`}
                  />
                </div>

                <span
                  data-business-text
                  className="mt-8 block text-xs font-medium tracking-[0.25em] text-subtext"
                >
                  {division.index}
                </span>
                <h3 data-business-text className="mt-3">
                  <Link
                    href={division.href}
                    className="inline-flex items-center gap-2 text-xl font-medium text-foreground transition-opacity hover:opacity-60 sm:text-2xl"
                  >
                    {division.title}
                    <span aria-hidden className="text-base sm:text-lg">
                      →
                    </span>
                  </Link>
                </h3>
                <p
                  data-business-text
                  className="mt-4 max-w-md text-sm font-normal leading-loose text-subtext sm:text-base"
                >
                  {division.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
