// @ts-nocheck
import React, { FC } from 'react';
import { TaClose, TaPin, TaPinUnsave, TaUnsave } from '@tant/icons';
import { Button } from '@tant/ui-next';
import { TABS_NAV } from 'xm-tabs/nav/props';
import { RC_TAB } from '@tant/rc-tabs';

interface Props {
    tab: RC_TAB,
    onContextMenuClick: TABS_NAV['onTabContextMenuClick'];
}

const Index: FC<Props> = ({
    tab, onContextMenuClick = () => {}
}) => {
    if (tab.fixed) {
        if (tab.edited) {
            return <TaPinUnsave className="tant-more-tab-fixed-unsave" onClick={() => onContextMenuClick('fixed', tab)} />;
        }
        return <TaPin className="tant-more-tab-fixed" onClick={() => onContextMenuClick('fixed', tab)} />;
    }
    if (tab.edited) {
        if (!tab.closeable) {
            return <TaUnsave className="tant-more-tab-unsave" />;
        }
        return <div className="tant-more-tab-unsave-hover">
            <TaUnsave className="tant-more-tab-unsave" />
            <Button
                type="text"
                icon={<TaPin />}
                className="tant-more-tab-unfixed"
                size="small"
                onClick={(e: any) => {
                    onContextMenuClick('fixed', tab)
                    e.stopPropagation();
                }}
            />

            {
                !!tab.closeable &&
                <Button
                    type="text"
                    icon={<TaClose />}
                    className="tant-more-tab-close"
                    size="small"
                    onClick={(e: any) => {
                        onContextMenuClick('close', tab)
                        e.stopPropagation();
                    }}
                />
            }
        </div>
    }
    return <>
        <Button
            type="text"
            icon={<TaPin />}
            className="tant-more-tab-unfixed"
            size="small"
            onClick={(e: any) => {
                onContextMenuClick('fixed', tab);
                e.stopPropagation();
            }}
        />
        {
            !!tab.closeable &&
            <Button
                type="text"
                icon={<TaClose />}
                className="tant-more-tab-close"
                size="small"
                onClick={(e: any) => {
                    onContextMenuClick('close', tab);
                    e.stopPropagation();
                }}
            />
        }
    </>
}

export default Index;