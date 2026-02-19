import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";
import type { ComponentType } from "react";

/**
 * ルート設定の型定義
 */
export interface RouteConfig {
  /** ルートのパス */
  path: string;

  /** コンポーネントの動的インポート関数 */
  loader?: () => Promise<{ default: ComponentType }>;

  /** ページ表示前のデータ取得処理 */
  dataLoader?: (args: LoaderFunctionArgs) => Promise<unknown>;

  /** フォーム送信などのアクション処理 */
  action?: (args: ActionFunctionArgs) => Promise<Response | null | undefined>;

  /** 認証が必要かどうか */
  requiresAuth?: boolean;

  /** パンくずリスト設定 */
  breadcrumb?: {
    parent?: string; // 親ルートのキー
    label: string;
  };
}

/**
 * ルート設定
 *
 * 各ページのルーティング設定を定義します。
 * ナビゲーション表示やアイコンなどのUI関連設定は sideMenu.tsx で管理します。
 * 新しいページを追加する場合は、ここに設定を追加してください。
 */
export const routeConfigs: Record<string, RouteConfig> = {
  home: {
    path: "/",
    loader: () => import("@features/home/Home"),
    breadcrumb: {
      label: "ホーム",
    },
  },
};

/**
 * ルートパスの定数（必要に応じて使用）
 *
 * TypeScriptの型安全性を保ちたい場合や、
 * 他のファイルでパスを参照したい場合に使用できます。
 */
export const ROUTES = {
  HOME: routeConfigs.home.path,
} as const;

/**
 * パスからルート設定を取得
 */
export const getRouteConfig = (path: string): RouteConfig | undefined => {
  return Object.values(routeConfigs).find((config) => config.path === path);
};

/**
 * ルートキーからルート設定を取得
 */
export const getRouteConfigByKey = (key: string): RouteConfig | undefined => {
  return routeConfigs[key];
};

/**
 * パンくずリストを生成
 *
 * @param routeKey - ルートキー
 * @returns パンくずリストの配列
 */
export const getBreadcrumbs = (routeKey: string): RouteConfig[] => {
  const route = routeConfigs[routeKey];
  if (!route?.breadcrumb) return [];

  const breadcrumbs: RouteConfig[] = [];

  // 親ページがある場合は再帰的に取得
  if (route.breadcrumb.parent) {
    breadcrumbs.push(...getBreadcrumbs(route.breadcrumb.parent));
  }

  breadcrumbs.push(route);
  return breadcrumbs;
};

/**
 * 認証が必要なルートを取得
 */
export const getAuthRequiredRoutes = (): RouteConfig[] => {
  return Object.values(routeConfigs).filter((config) => config.requiresAuth);
};

