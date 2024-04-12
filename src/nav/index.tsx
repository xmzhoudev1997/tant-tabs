import React, { FC, forwardRef, ReactNode } from 'react';
import './index.less';
import useData from './hook';
import { RcTabsNav, RC_TAB } from '@tant/rc-tabs';
import classNames from 'classnames';
// import { Dropdown, Tooltip, Button, Popover } from '@douyinfe/semi-ui';
// import { IconChevronDown, IconPlus } from '@douyinfe/semi-icons';
// import { TaPin, TaClose, TaAdd1, TaPinUnsave, TaUnsave } from '@tant/icons';
import { TABS_NAV } from './props';
import TabAddRender from '../default-render/tab-add';
import defaultTabOperRender from '../default-render/tab-oper';
import defaultTabMoreRender from '../default-render/tab-more';
import defaultTabRender from '../default-render/tab-render';

const Index: FC<TABS_NAV> = (props) => {
    const {
        maxTabNum = 9999, className, tabList = [], tabClassName, tabContextMenus, tabKey,
        tabDrag, addNode, moreNode,
        tabRender,
        ...extraProps
    } = props;
    const {
    } = useData(props);
    return (
        <RcTabsNav
            tabKey={tabKey}
            tabList={tabList}
            className={classNames(className, 'tant-tabs—nav')}
            tabClassName={classNames(tabClassName, 'tant-tab')}
            tabDrag={tabDrag}
            tabRender={tabRender || ((tab: RC_TAB, node: ReactNode) => defaultTabRender(tab, node, props))}
            addNode={addNode ?? <TabAddRender onContextMenuClick={props.onTabContextMenuClick} disabled={tabList?.length >= maxTabNum}/>}
            // tabContextMenuRender={tabContextMenuRender || ((tab: XM_TAB, tabNode: ReactNode) => defaultTabContextMenuRender(tab, tabNode, func, tabContextMenus, tabTipRender as any))}
            // tabOperRender={tabOperRender || ((tab: XM_TAB) => defaultTabOperRender(tab, func))}
            moreNode={moreNode ?? defaultTabMoreRender(props)}
            // moreRender={moreRender || (() => defaultTabMoreRender(func, tabList, tabKey || '', tabIconRender, tabRender, dragDisabled, onChange))}
            // tabIconRender={tabIconRender}
            // tabRender={tabRender}
            // onChange={onChange}
            // dragDisabled={dragDisabled}
            {...extraProps}
        />
    );
};

export default Index;