// "#company" のようなアンカーだけのhrefは、トップページ以外にいる時にクリックしても
// 遷移できないため、"/#company" のようにパスを明示する。
const FOOTER_LINKS = [
  { label: "私たちについて", href: "/#company" },
  { label: "事業内容", href: "/#business" },
  { label: "会社概要", href: "/company" },
  { label: "採用情報", href: "/recruit" },
  { label: "お問い合わせ", href: "/#contact" },
];

const LEGAL_LINKS = [
  { label: "プライバシーポリシー", href: "#" },
  { label: "サイトポリシー", href: "#" },
  { label: "特定商取引法に基づく表記", href: "#" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background px-6 py-16 sm:px-10 lg:px-16 xl:px-24">
      <div className="mx-auto flex max-w-[1520px] flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <span className="text-sm font-medium tracking-[0.2em] text-foreground">
          STAGE PARTNERS
        </span>

        <nav aria-label="フッターナビゲーション" className="overflow-x-auto">
          <ul className="flex flex-nowrap gap-x-3 gap-y-3 sm:flex-wrap sm:gap-x-10">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="whitespace-nowrap text-xs font-normal tracking-[0.1em] text-subtext transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1520px] flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[10px] font-normal tracking-[0.05em] text-subtext">
          © STAGE PARTNERS All Rights Reserved.
        </p>

        <nav aria-label="法的情報" className="overflow-x-auto">
          <ul className="flex flex-nowrap gap-x-3 gap-y-2 sm:flex-wrap sm:gap-x-8">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="whitespace-nowrap text-[9.5px] font-normal tracking-[0.05em] text-subtext transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
