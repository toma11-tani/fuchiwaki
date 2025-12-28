# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

フチワキヤは健康食品会社の静的Webサイトです。ビルドツールやフレームワークを使わず、素のHTML5、CSS3、JavaScript (ES6+) で構築されています。コメントとコンテンツはすべて日本語です。

**依存関係**:
- `@google/generative-ai` (Node.js 18.0.0以上) - 将来的なAI機能統合用（package-lock.jsonにのみ記録）
- 注意: package.jsonは存在せず、npm/npxコマンドは都度インストールで実行

## 開発コマンド

```bash
# ローカル開発サーバーを起動
python3 -m http.server 4173

# コミット前にHTMLを検証
npx htmlhint *.html

# 画像を圧縮（アセットディレクトリ内で実行）
npx imagemin src/* --out-dir=.

# CSSをフォーマット
npx prettier assets/css/style.css --write

# コミット前にgit状態を確認
git status -sb
```

## アーキテクチャ

### ファイル構成
- HTMLページはリポジトリルートに配置（静的ホスティング互換性のため）
  - `index.html`, `about.html`, `products.html`, `recipes.html`, `blog.html`, `company.html`, `forest.html`
- `assets/css/` - スタイル（reset.cssでブラウザ正規化、style.cssでコンポーネント管理）
- `assets/js/` - 機能別にスコープされたJavaScriptモジュール
- `assets/img/`, `assets/svg/`, `assets/video/` - メディアアセット（`img/products/`のようにサブディレクトリで整理）

### JavaScriptモジュールパターン

**グローバルスクリプト（全ページで読み込み）:**
- `menu.js` - ハンバーガーメニュー切り替え（`.hamburger`, `.nav.active`, `.nav-overlay`）
- `main.js` - スムーススクロール、フォーカス管理、ARIAベースのナビゲーション（`.header__toggle`）

**ページ固有スクリプト:**
- `home.js` - ホームページのインタラクティブ要素（#heroGreeting ボタン、ランダムメッセージ表示）
- `about.js` - にんたろうキャラクターアニメーション（クリックイベント、ハート生成、スクロールエフェクト）

**重要な実装ノート:**
- 2つの異なるメニュー実装が共存: `main.js`（ARIA）と`menu.js`（クラスベース）
- `main.js`のみIIFEパターン、他は`DOMContentLoaded`イベントリスナー
- ページ固有スクリプトは対応HTMLの`<script>`タグから`defer`で読み込み

新規スクリプトのテンプレート:
```javascript
// ページ固有スクリプト（推奨）
document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('.selector');
  if (!element) return;
  // 機能実装
});

// グローバルスクリプト（main.jsとの整合性が必要な場合のみ）
(function () {
  const element = document.querySelector('.selector');
  if (!element) return;
  // 機能実装
})();
```

### HTMLページ構造パターン

すべてのHTMLページは以下の共通構造に従います:
```html
<header class="header">
  <div class="header__inner">
    <a class="header__logo" href="index.html">
    <button class="hamburger" aria-label="メニューを開く">
    <nav class="nav" aria-label="メインメニュー">
  </div>
</header>
<div class="nav-overlay"></div>
<main id="main">
  <section class="section" aria-labelledby="...">
    <div class="wrapper">
```

**アクセシビリティ要件:**
- `<a class="skip-link" href="#main">` をbody開始直後に配置
- `role="banner"` on header, `role="list"` on card grids
- `aria-labelledby` でセクション見出しを参照
- `loading="lazy"` を画像に適用

### CSSアーキテクチャ
- `:root`でCSS変数を定義（色、フォント）
- BEM命名規則: `.block__element--modifier`（構造用）
- 状態修飾子: `.nav--open`（BEM）と`.active`（プレーンクラス）が混在
- モバイルファーストのレスポンシブデザイン（ブレークポイント: 720px, 1024px）
- ブランドカラー: `--color-gold: #B89B5E`, `--color-brown: #9C6B4A`
- レイアウトコンテナ: `.wrapper`（max-width: 1100px、padding: 0 1rem）

## コーディング規約

- 2スペースインデント、HTML属性はダブルクォート
- 1行約100文字を目安
- `const`/`let`を使用、`var`は使わない
- コメントは日本語で、最小限かつ機能的に
- 画像/動画の命名: `YYYYMMDD-topic.ext`
- コミットメッセージ: 英語の短い命令形（"add hero copy", "fix nav scroll"）
  - **重要**: Claude Codeの署名やCo-Authored-Byは含めない

### HTMLコンテンツ編集のガイドライン

**改行の使い方:**
- 文中の改行: `<br>`を使用
- 段落間の区切り: `<br><br>`を使用（より大きな空白）
- パソコンとスマホ両方での可読性を考慮して改行位置を決定

**商品ページの構造:**
- 商品説明: `<p class="lead-text">`を使用
- 特長セクション: `<p class="lead-text">`を使用（`<ul>`ではない）
- テキストのインデントは他のセクションと揃える

**ブログ投稿の追加方法（blog.html）:**
1. 投稿がない場合: `.blog-empty` セクションが「準備中」メッセージを表示
2. 投稿を追加する場合:
   - `.blog-empty` セクションを削除
   - コメントアウトされている `.blog-grid` セクションのコメントを外す
   - テンプレートをコピーして新しい記事を追加
   ```html
   <article class="blog-card">
     <img class="blog-card__image" src="assets/img/blog_X.jpg" alt="記事のサムネイル" loading="lazy">
     <div class="blog-card__body">
       <time class="blog-card__date" datetime="YYYY-MM-DD">YYYY年MM月DD日</time>
       <h3 class="blog-card__title">記事のタイトル</h3>
       <p class="blog-card__text">記事の概要</p>
       <a class="blog-card__link" href="#">続きを読む →</a>
     </div>
   </article>
   ```
3. 最新の記事が上に来るように並べる（新しい記事を先頭に追加）

## テスト要件

PR前の手動テストチェックリスト:
- ナビゲーションの開閉（マウス＋キーボード）
- スムーススクロールの動作
- クロスブラウザ: Safari, Chrome, モバイルエミュレータ
- フォーカスインジケーターとARIA属性
- HTMLHint検証をパス
- Lighthouseアクセシビリティ（目標: WCAG AA）

## PR要件

- 意図の要約を含める
- UI変更にはビフォー/アフターのスクリーンショット/動画を追加
- 実施した検証手順を記載
- 残タスクがあればリスト化
- 無関係な変更は別コミットに分離

## 関連ドキュメント

- `AGENTS.md` - 追加のリポジトリガイドライン（より詳細な実装ノート）
- `README.md` - 最小限のプロジェクト識別子
