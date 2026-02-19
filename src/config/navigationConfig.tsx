import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import type { SvgIconComponent } from '@mui/icons-material';

/**
 * ナビゲーション表示場所の型定義
 */
export type NavigationPlacement = 'sidebar' | 'bottom' | 'header' | 'all';

/**
 * ナビゲーションアイテムの型定義
 */
export interface NavigationItemType {
  id: string;
  label: string;
  path: string;
  icon: SvgIconComponent;
  disabled?: boolean;
  badge?: {
    count: number;
    color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  };
  children?: NavigationItemType[];
  placement: NavigationPlacement[]; // どのナビゲーションに表示するか
  order?: number; // 表示順序（小さい順）
}

/**
 * アプリケーションのナビゲーション設定
 * 
 * サイドメニュー、ボトムナビゲーション、ヘッダーメニューなど
 * 複数のナビゲーション要素で共通のメニュー設定を管理します。
 */
export const navigationItems: NavigationItemType[] = [
  {
    id: 'home',
    label: 'ホーム',
    path: '/',
    icon: HomeOutlinedIcon,
    placement: ['sidebar', 'bottom'],
    order: 1,
  }
];

/**
 * 指定された配置場所のナビゲーションアイテムを取得
 */
export const getNavigationItemsByPlacement = (placement: NavigationPlacement): NavigationItemType[] => {
  return navigationItems
    .filter(item => 
      item.placement.includes(placement) || item.placement.includes('all')
    )
    .sort((a, b) => (a.order || 0) - (b.order || 0));
};

/**
 * サイドメニュー用のナビゲーションアイテムを取得
 */
export const getSidebarNavigationItems = (): NavigationItemType[] => {
  return getNavigationItemsByPlacement('sidebar');
};

/**
 * ボトムナビゲーション用のナビゲーションアイテムを取得
 */
export const getBottomNavigationItems = (): NavigationItemType[] => {
  return getNavigationItemsByPlacement('bottom');
};

/**
 * ヘッダーメニュー用のナビゲーションアイテムを取得
 */
export const getHeaderNavigationItems = (): NavigationItemType[] => {
  return getNavigationItemsByPlacement('header');
};

/**
 * ナビゲーションアイテムをIDで検索
 */
export const findNavigationItemById = (id: string): NavigationItemType | undefined => {
  const findInItems = (items: NavigationItemType[]): NavigationItemType | undefined => {
    for (const item of items) {
      if (item.id === id) {
        return item;
      }
      if (item.children) {
        const found = findInItems(item.children);
        if (found) return found;
      }
    }
    return undefined;
  };
  
  return findInItems(navigationItems);
};

/**
 * パスからナビゲーションアイテムを検索
 */
export const findNavigationItemByPath = (path: string): NavigationItemType | undefined => {
  const findInItems = (items: NavigationItemType[]): NavigationItemType | undefined => {
    for (const item of items) {
      if (item.path === path) {
        return item;
      }
      if (item.children) {
        const found = findInItems(item.children);
        if (found) return found;
      }
    }
    return undefined;
  };
  
  return findInItems(navigationItems);
};

/**
 * アクティブなナビゲーションアイテムの判定
 */
export const isNavigationItemActive = (item: NavigationItemType, currentPath: string): boolean => {
  return item.path === currentPath || currentPath.startsWith(item.path + '/');
};

