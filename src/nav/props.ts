import { RC_TABS_NAV, RC_TAB } from '@tant/rc-tabs';
import { ReactNode } from 'react';
import { RC_CONTEXT_MENU } from './use-context-menu/props';

export type TABS_NAV_CONTEXT_MENU_KEY = 'fixed' | 'close' | 'close-all' | 'close-other' | 'close-right' | 'close-save' | 'add' | string;

export interface TABS_NAV extends RC_TABS_NAV {
    /**
     * 最大标签数
     */
    maxTabNum?: number;
    /**
     * 右击菜单，`tabRender`未配置时有效
     * @param tab 
     * @returns 
     */
    tabContextMenus?: (tab: RC_TAB) => RC_CONTEXT_MENU[];
    /**
     * 右击菜单响应时间，`tabContextMenus`有内容且`tabRender`未配置时有效
     * @param key 
     * @param tabKey 
     * @returns 
     */
    onTabContextMenuClick?: (key: TABS_NAV_CONTEXT_MENU_KEY, tab: RC_TAB) => void;
    tabIconRender?: (tab: RC_TAB) => ReactNode;
    tabOperRender?: (tab: RC_TAB) => ReactNode;
    tabTipRender?: (tab: RC_TAB) => ReactNode;
    onFilter?: (tab: RC_TAB, kwd: string) => boolean;
  }