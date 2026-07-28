import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Next.jsはlockfileを頼りにルートを自動判定するため、放置すると一つ上の
    // AI-Company/package-lock.json を拾い、リポジトリ全体をルートとみなしてしまう
    // (ファイル監視の範囲とキャッシュ検証のコストが不要に広がる)。
    // このプロジェクト自身をルートとして明示する。
    root: __dirname,
  },
};

export default nextConfig;
