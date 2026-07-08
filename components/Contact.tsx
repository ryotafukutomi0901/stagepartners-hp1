"use client";

import { useScopedGsap, gsap } from "@/hooks/useGsap";
import { scrollTriggerDefaults } from "@/lib/animations";

export default function Contact() {
  // ScrollTriggerのtriggerにscope要素自身を使うため、
  // 文字列セレクタではなく scope.current を直接渡す
  const sectionRef = useScopedGsap<HTMLElement>(({ scope }) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope.current,
        ...scrollTriggerDefaults,
      },
    });

    tl.from("[data-contact-heading]", {
      opacity: 0,
      y: 22,
      duration: 1,
      ease: "power2.out",
    })
      .from(
        "[data-contact-body]",
        { opacity: 0, y: 16, duration: 0.9, ease: "power2.out" },
        "-=0.6",
      )
      .from(
        "[data-contact-button]",
        { opacity: 0, y: 12, duration: 0.8, ease: "power2.out" },
        "-=0.5",
      );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="w-full bg-contact px-6 py-28 text-center sm:px-10 lg:px-16 lg:py-40"
    >
      <div className="mx-auto max-w-xl">
        <h2
          data-contact-heading
          className="text-2xl font-medium tracking-[0.05em] text-foreground sm:text-3xl"
        >
          一つひとつの空間が、
          <br />
          誰かの未来を動かすステージになる。
        </h2>
        <p
          data-contact-body
          className="mx-auto mt-8 max-w-sm text-sm font-normal leading-loose text-subtext sm:text-base"
        >
          建築・不動産に関するご相談は、お気軽にお問い合わせください。
        </p>
        <a
          data-contact-button
          href="mailto:info@stage-partners.example.com"
          className="mt-12 inline-flex items-center gap-3 bg-accent px-11 py-4 text-xs font-medium tracking-[0.2em] text-white transition-opacity hover:opacity-80"
        >
          お問い合わせ
        </a>
      </div>
    </section>
  );
}
