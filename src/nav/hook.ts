import { useRef } from "react";
import { TABS_NAV } from "./props";
import useRcContextMenu from './use-context-menu';
import { RC_CONTEXT_MENU } from "./use-context-menu/props";

export default ({
    tabList,
    onTabContextMenuClick = () => {}, tabContextMenus = () => []
}: TABS_NAV) => {
    const containerRef = useRef(null);
    useRcContextMenu({
        onChange: (k: string, d: RC_CONTEXT_MENU, dom?: HTMLElement) => {
            const key = dom?.getAttribute('data-key');
            const tab = tabList?.find(d => d.key === key);
            if (!tab) {
                return;
            }
            onTabContextMenuClick(k, tab);
        },
        container: containerRef as any,
        selector: '.rc-tab',
        menu: (dom?: HTMLElement) => {
            const key = dom?.getAttribute('data-key');
            const tab = tabList?.find(d => d.key === key);
            return tab ? tabContextMenus(tab) : []
        }
    })
    return {
        containerRef,
    }
}