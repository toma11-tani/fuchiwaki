# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

フチワキヤは健康食品会社の静的Webサイトです。ビルドツールやフレームワークを使わず、素のHTML5、CSS3、JavaScript (ES6+) で構築されています。コメントとコンテンツはすべて日本語です。

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
- `assets/css/` - スタイル（reset.cssでブラウザ正規化、style.cssでコンポーネント管理）
- `assets/js/` - 機能別にスコープされたJavaScriptモジュール
- `assets/img/`, `assets/svg/`, `assets/video/` - メディアアセット

### JavaScriptモジュールパターン
- `main.js` - グローバル機能（スムーススクロール、フォーカス管理）
- `menu.js` - ハンバーガーメニュー切り替え（全ページで読み込み）
- `home.js` - ホームページ固有のインタラクション
- `about.js` - アバウトページのキャラクターアニメーション

すべてのスクリプトはガード句付きのIIFEパターンを使用:
```javascript
(function () {
  'use strict';
  const element = document.querySelector('.selector');
  if (!element) return;
  // 機能実装
})();
```

### CSSアーキテクチャ
- `:root`でCSS変数を定義（色、フォント）
- BEM命名規則: `.block__element--modifier`
- 状態修飾子: `--open`, `--active`（JavaScriptと共有）
- モバイルファーストのレスポンシブデザイン（ブレークポイント: 720px, 1024px）
- ブランドカラー: `--color-gold: #B89B5E`, `--color-brown: #9C6B4A`

## コーディング規約

- 2スペースインデント、HTML属性はダブルクォート
- 1行約100文字を目安
- `const`/`let`を使用、`var`は使わない
- コメントは日本語で、最小限かつ機能的に
- 画像/動画の命名: `YYYYMMDD-topic.ext`
- コミットメッセージ: 英語の短い命令形（"add hero copy", "fix nav scroll"）

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
