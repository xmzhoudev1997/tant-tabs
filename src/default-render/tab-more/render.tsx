
// @ts-nocheck
import { Dropdown, Button, Search, Empty } from '@tant/ui-next';
import React, { FC } from 'react';
import { RC_TAB } from '@tant/rc-tabs';
import useData from './hook';
import './index.less';
import { TaArrowDown, TaDrag } from '@tant/icons';
import { TABS_NAV } from '../../nav/props';
import classNames from 'classnames';
import OperRender from './oper-render';

interface Props {
    props: TABS_NAV,
}

const Index: FC<Props> = ({
    props,
}) => {
    const { kwd, setKwd, disable, filterList, open, setOpen, scrollRef } = useData(props);
    const tabNodeRender = (tab: RC_TAB) => {
        const iconNode = props.tabIconRender ? props.tabIconRender(tab) : null;
        const tabNode =
            <div
                key={tab.key}
                className={classNames(
                    'tant-more-tab',
                    props.tabKey === tab.key ? 'tant-more-tab-active' : '',
                )}
                onClick={() => props.onTabKeyChange ? props.onTabKeyChange(tab.key) : null}
            >
                {
                    props.tabDrag && !disable && <TaDrag className="tant-more-tab-drag" />
                }
                {
                    !!iconNode && <div className="tant-more-tab-icon" onMouseDown={e => e.stopPropagation()}>
                        {iconNode}
                    </div>
                }
                <div className="tant-more-tab-name">
                    {tab.label}
                </div>
                {
                    <div className="tant-tab-oper" >
                        <OperRender tab={tab} onContextMenuClick={props.onTabContextMenuClick} />
                    </div>
                }
            </div >;
        return tabNode;
    }
    const dropdownContent = <div className="tant-more-dropdown">
        <Search value={kwd} onChange={setKwd as any} size="middle" bordered={false} allowClear />
        <div className="tant-more-dropdown-split" />
        {
            !filterList?.length ? <Empty /> :
                <div className="tant-more-scroll" ref={scrollRef}>
                    {
                        filterList?.map((tab) => tabNodeRender(tab))
                    }
                </div>
        }
    </div>
    return (
        <Dropdown
            trigger={["click"]}
            menu={{
                items: [],
            }}
            open={open}
            onVisibleChange={(v: boolean) => {
                setOpen(v);
                if (v) {
                    setKwd('');
                }
            }}
            dropdownRender={() => dropdownContent}
        >
            <Button
                icon={<TaArrowDown />}
                type="text"
            />
        </Dropdown>
    );
}

export default Index;