"use client";

import Image from "next/image";
import { useScopedGsap, gsap } from "@/hooks/useGsap";
import { scrollTriggerDefaults } from "@/lib/animations";

export default function Company() {
  const sectionRef = useScopedGsap<HTMLElement>(() => {
    gsap.from("[data-company-image]", {
      opacity: 0,
      scale: 1.06,
      duration: 1.4,
      ease: "power1.out",
      scrollTrigger: {
        trigger: "[data-company-image]",
        ...scrollTriggerDefaults,
      },
    });

    gsap.from("[data-company-text]", {
      opacity: 0,
      y: 26,
      duration: 1,
      stagger: 0.14,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "[data-company-text]",
        ...scrollTriggerDefaults,
      },
    });
  }, []);

  return (
    <section ref={sectionRef} id="company" className="w-full bg-background space-y-16 lg:space-y-24">
      <div className="mx-auto grid w-full max-w-[1520px] grid-cols-1 items-center gap-14 px-6 py-20 sm:px-10 lg:grid-cols-[1fr_0.72fr] lg:gap-16 lg:py-0 lg:px-16">
        <div
          data-company-image
          className="relative h-[46vh] overflow-hidden bg-[#161513] lg:h-[78vh]"
        >
          <Image
            src="/companyimage1.png"
            alt="STAGE PARTNERSが手がける建築空間"
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover object-[25%_center] contrast-[1.2] brightness-[0.8]"
          />
        </div>

        <div className="max-w-lg">
          <span
            data-company-text
            className="block text-xs font-medium tracking-[0.25em] text-subtext"
          >
            COMPANY
          </span>
          <h2
            data-company-text
            className="mt-6 text-2xl font-medium leading-[1.7] text-foreground sm:text-3xl"
          >
            空間に、意義を。
          </h2>
          <p
            data-company-text
            className="mt-8 text-sm font-normal leading-loose text-subtext sm:text-base"
          >
            建築は人の営みを受け止め、未来をつくる器です。
            <br />
            私たちSTAGE PARTNERSは、建築と不動産の力で人と場所の可能性を引き出し、これからの街と挑戦者たちのための舞台を創り続けます。
          </p>
        </div>
      </div>
    </section >
  );
}
