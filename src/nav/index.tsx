import React, { FC, forwardRef, ReactNode } from 'react';
import './index.less';
import useData from './hook';
import { RcTabsNav, RC_TAB } from '@tant/rc-tabs';
import classNames from 'classnames';
import { TABS_NAV } from './props';
import TabAddRender from '../default-render/tab-add';
import defaultTabMoreRender from '../default-render/tab-more';
import defaultTabRender from '../default-render/tab-render';

const Index: FC<TABS_NAV> = (props) => {
    const {
        maxTabNum = 9999, className, tabList = [], tabClassName, tabContextMenus, tabKey,
        tabDrag, addNode, moreNode,
        tabRender, onFilter, onDrag,
        ...extraProps
    } = props;
    const {
        containerRef,
    } = useData(props);
    return (
        <div className={classNames(className, 'tant-tabs—nav')} ref={containerRef}>
            <RcTabsNav
                tabKey={tabKey}
                tabList={tabList}
                tabClassName={classNames(tabClassName, 'tant-tab')}
                tabDrag={tabDrag}
                tabRender={tabRender || ((tab: RC_TAB, node: ReactNode) => defaultTabRender(tab, node, props))}
                addNode={addNode === undefined ? <TabAddRender onContextMenuClick={props.onTabContextMenuClick} disabled={tabList?.length >= maxTabNum} /> : addNode}
                extraNode={moreNode === undefined ? defaultTabMoreRender(props) : moreNode}
                onDrag={(v1, v2) => onDrag ? onDrag(v1, v2, 'nav') : null}
                {...extraProps}
            />
        </div>
    );
};

export default Index;