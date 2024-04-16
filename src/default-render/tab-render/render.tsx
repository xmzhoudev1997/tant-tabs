import { Dropdown, Tooltip } from '@tant/ui-next';
import React, { FC, ReactNode } from 'react';
import { RC_TAB } from '@tant/rc-tabs';
import useData from './hook';
import './index.less';
import { TABS_NAV } from 'xm-tabs/nav/props';
import classNames from 'classnames';
import { RC_CONTEXT_MENU } from '../../nav/use-context-menu/props';

interface Props {
    tab: RC_TAB,
    active: boolean,
    originTabNode: ReactNode;
    iconNode: ReactNode;
    operNode: ReactNode;
    contextMenus: RC_CONTEXT_MENU[];
    onContextMenuClick: TABS_NAV['onTabContextMenuClick'];
    tipNode: ReactNode;
}
const Index: FC<Props> = ({
    tab, originTabNode, iconNode, operNode, active, contextMenus, tipNode,
    onContextMenuClick = () => { },
}) => {
    const { key, setKey, handleClick, } = useData(onContextMenuClick);
    let node = <>
        {
            !!iconNode && <div className="tant-tab-icon">
                {iconNode}
            </div>
        }
        <div className="tant-tab-name">
            {tab.label}
        </div>
        {
            <div className="tant-tab-oper" >
                <div className={classNames(active ? 'tant-tab-oper-shadow-active' : '', 'tant-tab-oper-shadow')} />
                <div className={classNames(active ? 'tant-tab-oper-bg-active' : '', 'tant-tab-oper-bg')}>
                    <div onClick={e => e.stopPropagation()}>{operNode}</div>
                </div>
                <div className={classNames(active ? 'tant-tab-padding-active' : '', 'tant-tab-padding')} />
            </div>
        }
    </>
    node = React.cloneElement(originTabNode as any, { children: node, 'data-key': tab.key });
    if (tipNode) {
        node = <Tooltip
            placement='bottomLeft'
            className='tant-tab-tooltip'
            mouseLeaveDelay={0}
            mouseEnterDelay={0.5}
            title={tipNode}
        >
            {node}
        </Tooltip>
    }
    return node
}

export default Index;