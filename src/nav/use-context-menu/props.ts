import { ReactElement, ReactNode } from "react";

export interface RC_CONTEXT_MENU_API {
    /**
     * 触发容器
     */
    container: HTMLElement | React.MutableRefObject<HTMLElement>;
    /**
     * 样式选择器，在列表中时触发右击菜单
     */
    selector?: string;
    /**
     * 弹出框功能菜单
     */
    menu?: (dom: HTMLElement) => RC_CONTEXT_MENU[];
    /**
     * 右键菜单样式
     */
    className?: string;
    /**
     * 菜单宽度
     * @default 200
     */
    width?: number;
    /**
     * 触发点击事件
     */
    onChange?: (key: string, data: RC_CONTEXT_MENU, dom?: HTMLElement) => void;
}


export type RC_CONTEXT_MENU = RC_CONTEXT_MENU_ITEM | RC_CONTEXT_MENU_DIVIDER;

export interface RC_CONTEXT_MENU_ITEM {
    /**
     * 菜单项唯一键
     */
    key: string;
    /**
     * 菜单项标题
     */
    label: ReactNode;
    /**
     * 菜单项样式	
     */
    className?: string;
    /**
     * 是否禁用	
     */
    disabled?: boolean;
    /**
     * 菜单图标
     */
    icon?: ReactNode;
    /**
     * 快捷键
     */
    shortcutKeys?: string[];
    /**
     * 自定义渲染函数
     */
    render?: (d: RC_CONTEXT_MENU, node: ReactNode) => ReactNode;
}

export interface RC_CONTEXT_MENU_DIVIDER {
    /**
     * 菜单项唯一键
     */
    key: string;
    /**
     * 分割线
     */
    type: 'divider';
    /**
     * 自定义渲染函数
     */
    render?: (d: RC_CONTEXT_MENU, node: ReactNode) => ReactNode;
}