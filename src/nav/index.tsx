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
        tabRender,
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
                addNode={addNode ?? <TabAddRender onContextMenuClick={props.onTabContextMenuClick} disabled={tabList?.length >= maxTabNum} />}
                moreNode={moreNode ?? defaultTabMoreRender(props)}
                {...extraProps}
            />
        </div>
    );
};

export default Index;