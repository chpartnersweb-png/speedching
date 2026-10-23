# スピードチング SEO設定・料金エリア追加

基準URL：`https://speed-ching.pages.dev/`

## チラシの確認と本文への反映

未使用画像`src/assets/line_oa_chat_261021_103632.jpg`を確認し、ユーザーが今回指定した2点を掲載した。

- 即対応エリア：都町、西大分〜鶴崎方面。
- 初乗り：2km 1,800円〜。

ファーストビュー直下に「代行運転の料金・対応エリア」を追加し、店舗情報表にも両項目を掲載。相談案内の料金表記も更新した。内容は`src/data/site.ts`で管理する。

チラシ自体をそのまま貼り付けるのではなく、画像内の情報を読みやすいHTMLテキストとして反映した。原画像は参考素材として保存しており、本文では引き続き未使用。実車写真と生成した路面背景は従来どおり使用している。

追加距離の料金、税込・税別、配車までの分数、範囲外の条件等は不明のため補足していない。

## 実装したSEO設定

| 対象 | 内容 |
| --- | --- |
| 基準URL | `src/data/site-config.mjs`に集約し、Astro設定・ページ情報・クローラー用ファイルで共用 |
| Astro | `site`に公開URLを指定、静的出力を明示 |
| title | `スピードチング｜大分市の運転代行・初乗り2km 1,800円〜` |
| description | 大分市、店舗名、即対応エリア、初乗り料金、営業時間、年中受付、電話番号を記載 |
| canonical | `https://speed-ching.pages.dev/`を指定。クエリやページ内アンカーは含めない |
| robotsメタ | `index, follow, max-image-preview:large` |
| OGP | ページURL・タイトル・説明・日本語ロケール・絶対URLの画像・画像サイズ・代替文 |
| X共有カード | `summary_large_image`とタイトル・説明・画像・代替文 |
| 共有画像 | 実車写真からAstroの`getImage`で1200×630pxのJPEGをビルド時に生成する設定 |
| JSON-LD | WebSite、WebPage、LocalBusiness、運転代行と車のお預かりのService |
| robots.txt | 静的エンドポイントでクロール許可とサイトマップURLを出力 |
| sitemap.xml | 正規URLのトップページ1件のみ。ページ内アンカーは独立ページとして登録しない |

SEOの出力は`src/components/Seo.astro`と`src/lib/seo.ts`に分離した。JSON-LDは本文と共通のデータを参照し、`<`をエスケープして埋め込む。

構造化データには店舗名・電話・提供された住所・支払い方法・即対応エリア・初乗り料金の文字表記・サービス情報を含める。代行運転をタクシー事業と断定しないよう、一般のLocalBusinessとServiceで表現した。

営業日と祝日・定休日の優先関係は未確定のため、機械向けの`openingHoursSpecification`には推測した条件を追加していない。通常営業時間と事前予約の案内は、本文およびdescriptionに記載している。

地図座標、番地、認定番号、口コミ、評価、SNSアカウント、GoogleビジネスプロフィールのURLは追加していない。

## 変更ファイル

- `astro.config.mjs`
- `src/data/site-config.mjs`
- `src/data/site.ts`
- `src/components/FareArea.astro`
- `src/components/BusinessInfo.astro`
- `src/components/Seo.astro`
- `src/lib/seo.ts`
- `src/pages/index.astro`
- `src/pages/robots.txt.ts`
- `src/pages/sitemap.xml.ts`
- `src/styles/global.css`
- `docs/実装メモ.md`

## 確認状態

ユーザーの確認不要の指定を引き継ぎ、変更後のビルド・型チェック・ブラウザ確認・構造化データのテストは行っていない。共有画像を含む生成物も未確認。デプロイやSearch Console操作は実施していない。

着手時に提供URLをWeb閲覧ツールから参照したがアクセスできなかったため、公開環境の状態は判定していない。アクセス失敗を、サイト停止やSEO上の問題の証拠としては扱っていない。

## 公開後の手順（ユーザー側で実施）

1. 必要に応じて`npm run build`を実行し、通常のCloudflare Pagesの方法で再デプロイする。
2. 公開トップページの料金・エリア表示、canonical、OGP画像、JSON-LD、および`/robots.txt`・`/sitemap.xml`の出力を確認する。
3. Search Consoleで当該URLのプロパティを登録・所有権確認し、`https://speed-ching.pages.dev/sitemap.xml`を送信する。
4. 必要に応じてURL検査からトップページのインデックス登録をリクエストする。
5. リッチリザルトテスト等で出力を確認する。構造化データの実装は、検索結果での特別な表示や順位を保証するものではない。

## 参照した公式情報

- [Astro routing](https://docs.astro.build/en/guides/routing/)
- [Astro endpoints](https://docs.astro.build/en/guides/endpoints/)
- [Astro styles](https://docs.astro.build/en/guides/styling/)
- [Astro images](https://docs.astro.build/en/guides/images/)
- [Astro site設定](https://docs.astro.build/en/reference/configuration-reference/#site)
- [Google：タイトルリンク](https://developers.google.com/search/docs/appearance/title-link)
- [Google：canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google：LocalBusinessの構造化データ](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Schema.org：Service](https://schema.org/Service)
