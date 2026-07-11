# CHANGELOG

修正のたびに「何が起きていたか → 原因 → どのファイルをどう直したか」を追記していきます。

## 2026-07-07

### fix: `Values` セクション削除に伴うビルドエラーを修正

- **症状**: `components/Values.tsx` を手動で削除したところ、開発サーバーでエラーが発生。
- **原因**: `app/page.tsx` が削除後も `Values` コンポーネントを `import` ・使用したままだった。
- **対応**: `app/page.tsx` から `import Values from "@/components/Values";` と `<Values />` を削除。
- **確認**: `npx tsc --noEmit` でエラーが出ないことを確認。

### refactor: トップページをモック(`public/mocimage.png`)基準でゼロベース再設計

- **背景**: 以前の実装がモックの要素(余白・レイアウト・トーン)を反映できていないという指摘。
- **対応**:
  - フォントを Inter/Noto Sans JP → `Shippori Mincho` に変更(`app/layout.tsx`, `app/globals.css`)。
  - `Header` を `position: fixed`(透明背景)から `position: sticky` に変更し、Hero見出しとの重なりを解消(`components/Header.tsx`)。
  - `Hero` を左テキスト・右画像(モノクロ・暗め・コントラスト強め)の2カラム構成に再構築、CTAボタンは撤去(`components/Hero.tsx`)。
  - セクション構成を Header / Hero / Company / Business / Contact / Footer に整理(Mission/Vision/Value の `Values.tsx` は一時追加後、上記の理由で削除)。
  - GSAP + ScrollTrigger によるフェードアップ・画像reveal・パララックスを各セクションに追加。
- **確認**: `npm run build` / `npx tsc --noEmit` / `npm run lint` すべて成功。

## 2026-07-08

### fix: `Header` が存在しないCSS変数を参照していた問題を修正

- **症状**: 特になし(気づかないうちに残っていた不整合)。
- **原因**: `app/globals.css` から `--header-height` 変数を削除する編集が入ったが、`components/Header.tsx` 側は `h-[var(--header-height)]` のまま参照し続けていた。未定義のCSS変数はブラウザ側で無視されるため致命的なクラッシュはしないが、意図した高さが指定できていなかった。
- **対応**: `components/Header.tsx` の該当divから `h-[var(--header-height)]` を外し、`py-5` による自然な高さ指定に変更。
- **確認**: `npx tsc --noEmit` 成功、`npm run dev` を再起動し正常起動を確認。

### feat: `Business` の各タイトルにリンクを追加(建築/不動産ソリューション詳細ページへの導線)

- **背景**: 「建築ソリューション」「不動産ソリューション」のタイトルから、それぞれの詳細ページに遷移できるようにしたいという依頼。詳細ページ自体は後日制作予定のため、現時点では未作成で404になって問題ない。
- **対応**: `components/Business.tsx` の `DIVISIONS` に `href`(`/construction`, `/real-estate`)を追加し、各カードの `<h3>` タイトルを `next/link` の `Link` でラップしてリンク化。矢印アイコン(→)を添えてクリック可能であることを視覚的に示した。
- **確認**: `npx tsc --noEmit` / `npm run lint` / `npm run build` すべて成功。`app/construction`, `app/real-estate` は未作成のため、`npm run build` のルート一覧にも現れず、アクセス時は `/_not-found` にフォールバックすることを確認。

### feat: `/construction`・`/real-estate` に遷移先ページを実装

- **背景**: 404のままではなく、実際に遷移できる環境を用意してほしいという追加依頼。
- **対応**:
  - 共通の「準備中」表示用コンポーネント `components/ComingSoon.tsx` を新規作成(eyebrow/title/descriptionを受け取り、トップページへ戻るリンクを表示)。
  - `app/construction/page.tsx`・`app/real-estate/page.tsx` を新規作成し、`Header` / `ComingSoon` / `Footer` を組み合わせて実際にアクセス可能なページとして実装。
  - `metadata`(title/description)もページごとに設定。
- **確認**: `npm run build` のルート一覧に `/construction`・`/real-estate` が静的ページとして出力されることを確認。`npx tsc --noEmit` / `npm run lint` も成功。

### fix: 建築ソリューションカードに新規追加画像が反映されていなかった問題を修正

- **症状**: `public/contsructimage1.jpg`(バー・内装の実写真)が追加されていたが、`components/Business.tsx` の「建築ソリューション」カードは依然として仮画像 `/aimheroimage1.jpg` を参照しており、新しい写真が表示されていなかった。
- **原因**: 画像ファイルを `public/` に追加しただけで、コンポーネント側の `image` パスの差し替えが行われていなかった。またファイル名自体に `contsruct`(`construct` のタイポ)があった。
- **対応**:
  - `public/contsructimage1.jpg` → `public/constructimage1.jpg` にリネームしてタイポを修正。
  - `components/Business.tsx` の建築ソリューション(`index: "01"`)の `image` を `/constructimage1.jpg` に更新、写真の構図に合わせて `imagePosition` を `object-center` に調整。
  - ついでに `heroimage1.png` / `companyimage1.png` のファイルパーミッションが `600`(所有者のみ読み取り可)になっていたのを、他の`public`アセットと同じ `644` に修正。
- **確認**: `npx tsc --noEmit` / `npm run build` 成功。

### feat: ヘッダーを黒背景・白文字に変更、会社概要・採用情報ページを追加

- **背景**: ヘッダーを黒バック・白字に、CTA(お問い合わせ)は白BOX・黒字に変更したいという依頼。あわせて会社概要(`app/company`)・採用情報(`app/recruit`)ページもComing Soonで用意してほしいという依頼。
- **対応**:
  - `components/Header.tsx`: 背景を`#111111`固定、ロゴ・ナビ文字を白系(`text-white`/`text-white/75`)に変更。「お問い合わせ」ボタンは`bg-white text-[#111111]`に反転。スクロール時のGSAPアニメーションも透明→白ではなく、黒の不透明度が上がる方向に調整。モバイルメニューも黒背景・白文字に統一。ハンバーガーアイコンの線も白に変更。
  - ナビの「会社概要」「採用情報」のリンク先を `#`(ダミー)から実際のページパス(`/company`, `/recruit`)に変更。
  - `app/company/page.tsx`・`app/recruit/page.tsx` を新規作成。`/construction`・`/real-estate`と同じ`ComingSoon`コンポーネントを再利用し、`Header`/`Footer`込みで実際にアクセス可能なページとして実装。
  - `components/Footer.tsx` の `FOOTER_LINKS` にも「会社概要」「採用情報」へのリンクを追加。
- **確認**: `npx tsc --noEmit` / `npm run lint` / `npm run build` すべて成功。`npm run build` のルート一覧に `/company`・`/recruit` が静的ページとして追加されたことを確認。

### feat: 新しいHeroセクションを追加し、旧Heroを`Proclaim`として2番目のセクションに移行

- **背景**: これまでの`Hero.tsx`(ブランドメッセージ+heroimage1.png)を1番目のセクションから2番目に移動し、その上に新しいHeroセクションを追加してほしいという依頼。
- **対応**:
  - 旧`components/Hero.tsx`の中身をそのまま`components/Proclaim.tsx`として新設(data属性名・関数名・見出しタグ(`h1`→`h2`、ページ内で唯一の`h1`は新Heroに譲る)のみ変更、レイアウト・アニメーション・文言は変更なし)。
  - `components/Hero.tsx`を新規に書き直し、`public/heroimage2.jpg`(河川敷の街並み写真)を背景に、`brightness-[0.92] saturate-[0.75]`でごく軽く減光・減彩。中央に黒文字で見出し「CREATE A YOUR STAGE」(既存と同じ`Shippori Mincho`フォント)を配置。写真が明るいため、黒文字の視認性を確保する目的で`bg-white/20`の薄いスクリムを重ねている(この一手はユーザー指示にはない追加判断)。
  - `app/page.tsx`のセクション順を `Header → Hero(新) → Proclaim(旧Hero) → Company → Business → Contact → Footer` に更新。
- **確認**: `npx tsc --noEmit` / `npm run lint` 成功。`npm run build`はサンドボックスのGoogleフォント取得が一時的に失敗したため未実行(コード起因ではなくネットワーク起因、過去にも発生した既知の事象)。

### fix: Heroセクションのレイアウトを白背景+全幅画像の構成に修正

- **背景**: 直前に実装したHero(黒文字+画像上にスクリム)ではなく、「横は100%サイト幅」「上部に余白を開けてそこに見出しを配置」「背景は白」「アニメーションは既存コンポーネントと揃える」という要望。
- **対応**:
  - `components/Hero.tsx` を全面的に書き直し。セクション背景を白(`bg-background`)にし、上部に余白(`pt-20`〜`lg:pt-32`)を確保してその中に見出し「CREATE A YOUR STAGE」を配置(白背景の上の黒文字なので、前回追加したスクリムは不要になり削除)。
  - 見出しの下に `heroimage2.jpg` を配置。この画像用の`div`は他の`max-w-[1520px]`コンテナの外に置くことで、特別な全幅breakoutハックなしに自然にサイト幅100%(`w-full`)で表示されるようにした。
  - アニメーションは独自のタイムラインをやめ、`Company`/`Business`/`Contact`と同じ`scrollTriggerDefaults`(`lib/animations.ts`)を使ったフェードアップ・画像revealパターンに統一。
- **確認**: `npx tsc --noEmit` / `npm run lint` 成功。

### feat: Heroの入場アニメーションをよりインパクトのある演出に強化

- **背景**: 「見出しだけだと弱い、初期離脱を防ぐためにもっとインパクトのあるUIにしてほしい」という依頼。文字・画像はそのまま、演出はプロとしての裁量に任せるとのこと。
- **対応**:
  - `gsap`に同梱されている`SplitText`プラグイン(GSAP 3.13以降で無料化)を`hooks/useGsap.ts`に登録・エクスポート。
  - `components/Hero.tsx`: 見出し「CREATE A YOUR STAGE」を`SplitText`で1文字ずつ`mask`付きで分割し、下からせり上がるマスクリビール(`yPercent: 120→0` + 軽い回転)で1文字ずつ出現させる演出に変更。
  - 画像は単純なopacity/scaleではなく、`clip-path: inset()`を使ったカーテンが開くようなワイプリビール(下→上)+ゆっくりとしたKen Burns風のズームアウトに変更。
  - 画像下部に明滅する「SCROLL」インジケーターを追加し、スクロール誘導によって初期離脱を防ぐ工夫を追加。
  - Heroは常にファーストビューに入るセクションのため、ScrollTrigger起点ではなくマウント直後に一度だけ再生する構成にした(他セクションのスクロール連動アニメーションとは意図的に方式を変えている)。
- **確認**: `npx tsc --noEmit` / `npm run lint` 成功。

### feat: 超ワイドモニターでHero画像の左右に余白を追加

- **背景**: Hero画像が`w-full`でサイト幅100%になっているため、非常に横幅の広いモニターで見ると画像が際限なく伸びてしまう。全画面時に左右へある程度の余白を持たせたいという依頼。
- **対応**: `components/Hero.tsx` の画像ラッパー(`data-hero-image-wrap`)に `max-w-[1800px] mx-auto` を追加。通常のモニター幅(1800px以下)では従来通りサイト幅100%のまま、1800pxを超えるウルトラワイド環境でのみ中央寄せで左右に余白が生まれるようにした。
- **確認**: `npx tsc --noEmit` 成功。

### fix: Proclaimセクションにアニメーションが効いていなかった問題を修正 / Hero見出しに専用フォントを追加

- **症状1**: Proclaimセクション(旧Hero)にスクロールしてもアニメーションが見えない。
- **原因1**: `Proclaim.tsx`のGSAPタイムラインが`scrollTrigger`を指定しておらず、コンポーネントのマウント直後(ページ読み込み直後、Proclaimがまだ画面外)に一度きり再生されていたため、ユーザーが実際にスクロールしてセクションを見た時にはアニメーションがとっくに終わっていた。
- **対応1**: `components/Proclaim.tsx` のタイムラインに `scrollTrigger: { trigger: scope.current, ...scrollTriggerDefaults }` を追加してスクロール連動に変更。あわせて「Companyより力強い演出」の依頼に応え、単純なfade+scaleではなく、画像を`clip-path`のワイプで出現させ、見出しの各行をマスクで下から迫り上げる(`yPercent:115→0`, `expo.out`)強めのリビールに変更。
- **依頼2**: Heroの「CREATE A YOUR STAGE」のフォントを変更し、力強さを出したい。
- **対応2**: `app/layout.tsx` に新しく `Anton`(Google Fonts、極太コンデンス体の見出し専用フォント)を追加し、CSS変数 `--font-anton` として登録。`components/Hero.tsx` の見出しにのみ `[font-family:var(--font-anton)]` で適用し、サイト全体のShippori Minchoとは独立して力強い印象になるようにした。あわせて文字サイズも一回り大きく調整。
- **確認**: `npx tsc --noEmit` / `npm run lint` 成功。

### feat: Hero見出しのフォントをAnton→Bodoni Modaに変更(優雅・筆記体方向へ)

- **背景**: Antonの力強さは方向性が合わず、フォント候補を10個提示。最終的に「優雅・筆記体方向」を選択いただいたため、Playfair Display / Cormorant / Italiana / Bodoni Modaを比較検討し、Bodoni Modaを提案・採用。
- **理由**: Bodoni Modaは極太(900)+イタリックが使え、線の太細コントラストが強いハイファッション系セリフ。優雅さとインパクトを両立でき、Playfair Displayよりモダン、Italianaより力強い中間的な着地点として最適と判断。
- **対応**:
  - `app/layout.tsx`: `Anton`のインポート・変数定義を削除し、`Bodoni_Moda`(`weight: ["700","900"]`, `style: ["normal","italic"]`)を`--font-bodoni-moda`として追加。
  - `components/Hero.tsx`: 見出しのフォント指定を`--font-anton`→`--font-bodoni-moda`に変更。`uppercase`(全て大文字化)をやめ`italic capitalize`(斜体+先頭大文字)にして、セリフ体イタリックらしい優雅な見え方に調整。ウェイトは`font-black`(900)。
- **確認**: `npx tsc --noEmit` / `npm run lint` 成功。

### fix: フォントをAmiri Quranに手動変更した際のエラーを修正

- **症状**: `app/layout.tsx`のインポートを`Bodoni_Moda`→`Amiri_Quran`に手入力で変えたところ、大量のエラーが発生。
- **原因**: インポート文は`Amiri_Quran`に変更されていたが、実際に呼び出している関数は`Bodoni_Moda(...)`のまま(未インポートの関数呼び出し)。加えて`weight: ["700","900"], style: ["normal","italic"]`という設定は、weight:"400"/style:"normal"のみ対応する`Amiri Quran`には無効な指定だった。
- **対応**: `app/layout.tsx` の関数呼び出しを`Amiri_Quran({...})`に修正し、変数名も`amiriQuran`に統一。`weight`を`Amiri Quran`が対応する`"400"`のみに変更(`style`指定も削除、対応が`normal`のみのため)。`<html>`タグの参照も`amiriQuran.variable`に修正。
- **確認**: `npx tsc --noEmit` / `npm run lint` / `npm run build` すべて成功。

### fix: Hero見出しの疑似太字・疑似斜体を解除し、Amiri Quran本来の見た目に

- **背景**: Amiri Quranはweight:"400"/style:"normal"のみのフォントのため、`font-black italic`を指定するとブラウザが疑似的に太字・斜体を合成してしまい、本来の書体デザインが崩れる。
- **対応**: `components/Hero.tsx` の見出しクラスから `font-black italic` を外し `font-normal` に変更。
- **確認**: `npx tsc --noEmit` 成功。

### fix: Hero見出しの文字下端が切れる問題を修正

- **症状**: 「CREATE A YOUR STAGE」の文字下部が少し切れて見える。
- **原因**: 見出しの入場アニメーションは`SplitText`の`mask: "chars"`で1文字ずつ`overflow: hidden`のマスクに包んで実現しているが、そのマスクの高さは行の高さ(`leading-[1.05]`)に連動する。`Amiri Quran`はdescender(gの下部など)が大きめの装飾的フォントのため、行の高さがタイトすぎてマスクからはみ出た部分が切れていた。
- **対応**: `components/Hero.tsx` の見出しの `leading-[1.05]` を `leading-[1.5]` に変更し、マスクの高さに余裕を持たせた。
- **確認**: `npx tsc --noEmit` 成功。

## 2026-07-09

### fix: Vercelビルドが `npm error 404 object.` で失敗する問題を修正

- **症状**: GitHubリポジトリをVercelにインポートしてデプロイしたところ、`npm install`が `404 Not Found - GET https://registry.npmjs.org/object./-/object.-1.2.1.tgz` で失敗。
- **原因**: `package-lock.json`内で、実在するパッケージ `object.values`(eslint-plugin-react・jsx-ast-utilsの依存)の名前から「values」の部分だけが欠落し、存在しない`object.`というパッケージ名に化けていた(依存関係のキー2箇所、解決済みエントリのキー、`resolved`のtarball URLの計4箇所)。ローカルの`node_modules`には正しく`object.values`が入っていたため今まで気づかず、`npm install`で再生成してもなぜか同じ壊れた名前で書き出されてしまい、レジストリを直接`curl`で確認して初めてnpm CLI側の生成結果だけが壊れている(レジストリ自体は正常)と判明した。
- **対応**: `registry.npmjs.org`から直接取得した正しいメタデータ(バージョン・integrityハッシュ・依存関係)をもとに、`package-lock.json`の該当4箇所を`object.values`に手動修正。
- **確認**: `node_modules`を退避した状態で`npm ci`(Vercelと同じクリーンインストール)が成功することを確認。`npx tsc --noEmit` / `npm run lint` / `npm run build` すべて成功。修正をコミットしGitHubにpush済み(Vercel側は自動で再デプロイされるはずです)。

## 2026-07-11

### style: `Company`セクションの見出し・本文を`Proclaim`セクションと同じ文字サイズに統一

- **背景**: Hero直後の`Proclaim`セクション(「不動産や建築を扱うということは〜」)と`Company`セクション(「空間に、意義を。」)で文字サイズと左右余白を揃えてほしいという依頼。あわせて`Proclaim`内のキラーワード「主役は、その場所で挑戦する人たちだ。」は目立つようひと回り大きくしてほしいとのこと。
- **確認事項**: 左右の余白(`px-6 sm:px-10 lg:px-16` / `max-w-[1520px]`)は`Hero`・`Proclaim`・`Company`の3セクションですでに共通だったため変更不要だった。キラーワードもすでに`text-[1.4em]`で他の行の1.4倍のサイズに指定済みだった。
- **対応**: `components/Company.tsx`の見出し(`空間に、意義を。`)と本文段落のクラスを、`Company`独自のサイズ(`text-2xl sm:text-3xl` / `text-sm sm:text-base leading-loose`)から、`Proclaim`の本文と同じ`text-[1.7rem] sm:text-[1.9rem] lg:text-[2.3rem] leading-[1.65] tracking-[0.02em]`に統一。
- **確認**: `npm run build`成功。`npm run dev`を起動しPlaywrightでスクロールしながらスクリーンショットを撮影し、`Company`の見出し・本文が`Proclaim`の文字サイズと揃っていること、キラーワードが周囲より大きく表示されていることを目視確認。

### style: `Proclaim`・`Company`の見出し・本文サイズを`Business`セクション基準に統一

- **背景**: 上記の対応(`Company`を`Proclaim`基準に統一)は方向が逆で、基準にすべきは`Business`(事業内容)セクションのサイズだったとの指摘。改めて`Proclaim`・`Company`の両方を`Business`の見出し・本文サイズへ統一してほしいという依頼。
- **対応**:
  - `components/Proclaim.tsx`: 見出し(`不動産や建築を扱うということは〜`)のクラスを`text-[1.7rem] sm:text-[1.9rem] lg:text-[2.3rem] leading-[1.65] tracking-[0.02em]`から、`Business`のh2と同じ`text-2xl sm:text-3xl leading-[1.7]`に変更。
  - `components/Company.tsx`: 見出し(`空間に、意義を。`)を同じく`text-2xl sm:text-3xl leading-[1.7]`に、本文段落を`Business`のintro文と同じ`mt-6 text-sm sm:text-base leading-loose`に変更(従来は見出しと同サイズの`text-[1.7rem]〜`だった)。
- **確認**: `npm run build`成功。
