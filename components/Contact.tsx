"use client";

import { useState } from "react";
import Image from "next/image";
import { useScopedGsap, gsap } from "@/hooks/useGsap";
import { scrollTriggerDefaults } from "@/lib/animations";

// お問い合わせフォーム。送信は Web3Forms を利用する。
// ドメイン確定後、Web3Forms で発行される正式な access_key に差し替える。
// それまでは仮のキーのため、実際の送信はエラーになる(UIは完成状態)。
const WEB3FORMS_ACCESS_KEY = "00000000-0000-0000-0000-000000000000";

const INQUIRY_TYPES = [
  "不動産の売却・買取のご相談",
  "賃貸・空室のご相談",
  "リフォーム・改修のご相談",
  "建物・入居者の管理のご相談",
  "その他のお問い合わせ",
];

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const sectionRef = useScopedGsap<HTMLElement>(({ scope }) => {
    gsap.from("[data-contact-fade]", {
      opacity: 0,
      y: 22,
      duration: 1,
      ease: "power2.out",
      stagger: 0.12,
      scrollTrigger: { trigger: scope.current, ...scrollTriggerDefaults },
    });
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "STAGE PARTNERS｜サイトからのお問い合わせ");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        e.currentTarget.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full overflow-hidden bg-[#111111] px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
    >
      {/* 背景写真(モノクロ) */}
      <div className="media-static absolute inset-0 opacity-40">
        <Image
          src="/heroimage1.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"
      />

      <div className="relative z-10 mx-auto grid max-w-[1520px] grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="text-white">
          <span
            data-contact-fade
            className="block text-xs font-medium tracking-[0.25em] text-white/60"
          >
            CONTACT
          </span>
          <h2
            data-contact-fade
            className="mt-6 text-2xl font-medium leading-[1.55] sm:text-3xl lg:text-[2.6rem]"
          >
            土地と建物のこと、
            <br />
            まずは聞かせてください。
          </h2>
          <p
            data-contact-fade
            className="mt-7 max-w-md text-sm font-normal leading-loose text-white/70 sm:text-base"
          >
            売却・賃貸・リフォーム・管理まで、どんな段階のご相談でも構いません。ご相談は無料です。お気軽にお問い合わせください。
          </p>
          <div
            data-contact-fade
            className="mt-10 space-y-1 text-sm text-white/70"
          >
            <p className="text-[11px] tracking-[0.2em] text-white/50">TEL</p>
            <p className="text-lg tracking-[0.05em] text-white">000-000-0000</p>
            <p className="text-xs text-white/50">受付時間　平日 9:00 – 18:00</p>
          </div>
        </div>

        <form
          data-contact-fade
          onSubmit={handleSubmit}
          className="bg-white p-7 sm:p-10"
        >
          <div className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-xs font-medium tracking-[0.1em] text-subtext">
                お名前 <span className="text-foreground">*</span>
              </span>
              <input
                type="text"
                name="name"
                required
                className="mt-2 w-full border-b border-border bg-transparent py-2.5 text-sm text-foreground outline-none transition-colors focus:border-foreground"
              />
            </label>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-medium tracking-[0.1em] text-subtext">
                  メールアドレス <span className="text-foreground">*</span>
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-2 w-full border-b border-border bg-transparent py-2.5 text-sm text-foreground outline-none transition-colors focus:border-foreground"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium tracking-[0.1em] text-subtext">
                  電話番号
                </span>
                <input
                  type="tel"
                  name="phone"
                  className="mt-2 w-full border-b border-border bg-transparent py-2.5 text-sm text-foreground outline-none transition-colors focus:border-foreground"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-xs font-medium tracking-[0.1em] text-subtext">
                ご相談の種別
              </span>
              <select
                name="inquiry_type"
                defaultValue={INQUIRY_TYPES[0]}
                className="mt-2 w-full border-b border-border bg-transparent py-2.5 text-sm text-foreground outline-none transition-colors focus:border-foreground"
              >
                {INQUIRY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-xs font-medium tracking-[0.1em] text-subtext">
                お問い合わせ内容 <span className="text-foreground">*</span>
              </span>
              <textarea
                name="message"
                required
                rows={4}
                className="mt-2 w-full resize-none border-b border-border bg-transparent py-2.5 text-sm text-foreground outline-none transition-colors focus:border-foreground"
              />
            </label>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-2 inline-flex items-center justify-center gap-3 bg-accent px-11 py-4 text-xs font-medium tracking-[0.2em] text-white transition-opacity hover:opacity-80 disabled:opacity-50"
            >
              {status === "sending" ? "送信中..." : "この内容で送信する"}
              {status !== "sending" && <span aria-hidden>→</span>}
            </button>

            {status === "success" && (
              <p className="text-xs leading-relaxed text-foreground">
                お問い合わせありがとうございます。担当者より折り返しご連絡いたします。
              </p>
            )}
            {status === "error" && (
              <p className="text-xs leading-relaxed text-subtext">
                送信に失敗しました。お手数ですが、お電話にてお問い合わせください。
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
