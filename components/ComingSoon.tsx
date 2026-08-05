import Link from "next/link";

type ComingSoonProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function ComingSoon({
  eyebrow,
  title,
  description,
}: ComingSoonProps) {
  return (
    <section className="flex min-h-[70vh] w-full items-center justify-center bg-paper px-6 py-28 text-center sm:px-10 lg:px-16">
      <div className="mx-auto max-w-xl">
        <p className="flex items-center justify-center gap-4 font-latin text-[10px] tracking-[0.35em] text-ink-muted sm:text-[11px]">
          <span aria-hidden className="inline-block h-px w-10 bg-ink/25" />
          {eyebrow}
        </p>
        <h1 className="t-heading mt-8 font-display font-normal text-ink">
          {title}
        </h1>
        <p className="t-note mt-6 text-ink-muted">
          {description}
          <br />
          このページは近日公開予定です。
        </p>
        <Link
          href="/"
          className="mt-12 inline-flex items-center gap-3 text-xs font-medium tracking-[0.2em] text-ink transition-opacity hover:opacity-60"
        >
          トップページへ戻る
          <span aria-hidden className="inline-block h-px w-9 bg-ink" />
        </Link>
      </div>
    </section>
  );
}
