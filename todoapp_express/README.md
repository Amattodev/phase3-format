## 環境構築

・Express でサーバー立ち上げ
・Typescript インストール
　- Typescript → Javaescript へ変換　 → Express で立ち上げ
　- コンパイルで面倒
・nodemon で TypeScript を監視し、自動変換

# ローカル立ち上げ時

・node src/server/index.js でローカル環境立ち上げ
・npx nodemon でコンパイル可能
・以降、自動セーブで自動コンパイル可能（リロードする必要あり）

# React アプリケーションを client ディレクトリで立ち上げ

## Next

・React× TypeScritp でまずは todoapp を作成
・Express をつなげると更新が大変
