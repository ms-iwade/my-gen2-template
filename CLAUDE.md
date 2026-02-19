# 開発ルール

## TypeScript

- `any`使用禁止 - 明確な型定義必須
- 型安全性を最優先とする

## ディレクトリ構造

### ページ作成

1. `src/features/[機能名]/`でディレクトリ作成
2. サブディレクトリ：`components/`, `hooks/`, `types/`, `services/`
3. `src/config/routes.ts`にルート追加

### Shared モジュール

- `src/shared/[機能名]/`配置
- 必須：`index.ts`（エクスポート）, `README.md`（仕様）
- Context 使用時：`types.ts`で型定義、カスタムフックでアクセス
- 命名：PascalCase（コンポーネント）、camelCase（フック）
- 型名：PascalCase + `Type`/`Interface`サフィックス
