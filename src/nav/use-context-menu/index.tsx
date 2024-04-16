import React, { FC, useEffect, useMemo, useRef } from "react";
import { RC_CONTEXT_MENU, RC_CONTEXT_MENU_API, RC_CONTEXT_MENU_DIVIDER, RC_CONTEXT_MENU_ITEM } from "./props";
import { Root, createRoot } from "react-dom/client";
import './index.less';

const SPECIAL_KEY_MAP = {
    command: '⌘',
    option: '⌥',
    shift: '⇧',
    enter: '↵',
    ctrl: '^',
}

const Menus: FC<{
    menu: RC_CONTEXT_MENU[],
    onClick: (d: RC_CONTEXT_MENU) => void,
}> = ({
    menu,
    onClick,
}) => {
        const shortcutRender = (shortcutKeys: string[]) => {
            return shortcutKeys.map(d => {
                if (Object.keys(SPECIAL_KEY_MAP).includes(d.toLowerCase())) {
                    return <div key={d} className="rc-context-menu-shortcut-item">{(SPECIAL_KEY_MAP as any)[d.toLowerCase()]}</div>
                }
                return <div key={d} className="rc-context-menu-shortcut-item">{d.toUpperCase()}</div>
            })
        }
        return menu.map(d => {
            let node = null;
            if ((d as RC_CONTEXT_MENU_DIVIDER).type === 'divider') {
                node = <li className="rc-context-menu-divider" key={d.key} />;
            } else {
                node = <li
                    className="rc-context-menu-item"
                    key={d.key}
                    onClick={() => onClick(d)}
                >
                    <div className="rc-context-menu-icon">{(d as RC_CONTEXT_MENU_ITEM).icon}</div>
                    <div className="rc-context-menu-name">{(d as RC_CONTEXT_MENU_ITEM).label}</div>
                    <div className="rc-context-menu-shortcut">{shortcutRender((d as RC_CONTEXT_MENU_ITEM).shortcutKeys || [])}</div>
                </li>
            }
            return d.render ? d.render(d, node) : node;
        })
    }

export default ({
    menu = () => [], width = 200, className,
    container, selector,
    onChange = () => { },
}: RC_CONTEXT_MENU_API) => {
    const cacheRef = useRef<Root>();
    const handleOpenContextMenu = async (e: MouseEvent) => {
        const con = (container as React.MutableRefObject<HTMLElement>).current || container;
        let triggerDom: any = null;
        if (selector) {
            con.querySelectorAll(selector).forEach(d => {
                if (e.target && d.contains(e.target as any)) {
                    triggerDom = d;
                }
            })
        } else {
            triggerDom = con;
        }
        if (!triggerDom) {
            return;
        }

        const menus = menu(triggerDom);
        if (!menus.length) {
            return null;
        }
        let totalHeight = 8;
        menus?.forEach(d => {
            if ((d as RC_CONTEXT_MENU_DIVIDER).type === 'divider') {
                totalHeight += 9;
                return;
            }
            totalHeight += 30;
        })

        e.preventDefault();
        const pageX = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const pageY = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        let left = e.clientX;
        let top = e.clientY;
        if (pageX < left + width) {
            left = left - width;
        }
        if (pageY < top + totalHeight) {
            top = top - totalHeight;
        }
        await handleContainerClose();
        const dom = document.createElement('ul');
        dom.tabIndex = 0;
        dom.style.zIndex = `9999`;
        dom.style.width = `${width}px`;
        dom.style.height = `${totalHeight}px`;
        dom.style.position = 'fixed';
        dom.style.top = `${top}px`;
        dom.style.left = `${left}px`;
        dom.classList.add('rc-context-menu');
        if (className) {
            dom.classList.add(className);
        }
        document.body.appendChild(dom);
        dom.focus();
        const root = createRoot(dom);
        root.render(<Menus
            menu={menus}
            onClick={d => {
                onChange(d.key, d, triggerDom);
                handleContainerClose();
            }} />);
        (root as any).dom = dom;
        (root as any).trigger = triggerDom;
        (cacheRef as any).current = root;
        dom.onblur = handleContainerClose;
        dom.oncontextmenu = e => e.preventDefault();
        triggerDom.setAttribute('context-menu', true);
    }
    const handleContainerClose = async () => {
        const root = cacheRef.current as any;
        if (root) {
            await root.unmount();
            const dom = root.dom;
            const trigger = root.trigger;
            if (dom) {
                dom.remove();
            }
            if (trigger) {
                trigger.setAttribute('context-menu', false);
            }
            (cacheRef as any).current = null;
        }
    }

    useEffect(() => {
        const con = (container as React.MutableRefObject<HTMLElement>).current || container;
        if (!con) {
            return;
        }
        con.oncontextmenu = handleOpenContextMenu;
        con.onscroll = handleContainerClose;

    })
    return handleContainerClose;
}