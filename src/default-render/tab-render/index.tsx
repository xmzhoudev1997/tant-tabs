import { RC_TAB } from '@tant/rc-tabs';
import Render from './render';
import React, { ReactNode } from 'react';
import { TABS_NAV } from '.././../nav/props';
import TabOper from '../tab-oper';

export default (
    tab: RC_TAB,
    tabNode: ReactNode,
    props: TABS_NAV,
) => {
    return (
        <Render
            tab={tab}
            active={props.tabKey === tab?.key}
            originTabNode={tabNode}
            iconNode={props.tabIconRender ? props.tabIconRender(tab) : null}
            operNode={props.tabOperRender ? props.tabOperRender(tab) : <TabOper tab={tab} onContextMenuClick={props.onTabContextMenuClick} />}
            contextMenus={props.tabContextMenus ? props.tabContextMenus(tab) : []}
            onContextMenuClick={props.onTabContextMenuClick}
            tipNode={props.tabTipRender ? props.tabTipRender(tab) : null}
        />
    );
}