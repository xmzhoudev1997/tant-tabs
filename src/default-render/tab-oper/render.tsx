import React, { FC } from 'react';
import { TaClose, TaPin, TaPinUnsave, TaUnsave } from '@tant/icons';
import './index.less';
import { TABS_NAV } from 'xm-tabs/nav/props';
import { RC_TAB } from '@tant/rc-tabs';

interface Props {
    tab: RC_TAB,
    onContextMenuClick: TABS_NAV['onTabContextMenuClick'];
}

const Index: FC<Props> = ({
    tab, onContextMenuClick = () => {},
}) => {
    if (tab.fixed) {
        if (tab.edited) {
            return <TaPinUnsave className="tant-tab-fixed-unsave" onClick={() => onContextMenuClick('fixed', tab)} />;
        }
        return <TaPin className="tant-tab-fixed" onClick={() => onContextMenuClick('fixed', tab)} />;
    }
    if (tab.edited) {
        if (!tab.closeable) {
            return <TaUnsave className="tant-tab-unsave" />;
        }
        return <div className="tant-tab-unsave-hover">
            <TaUnsave className="tant-tab-unsave" />
            <TaClose className="tant-tab-close" onClick={() => onContextMenuClick('close', tab)} />
        </div>
    }
    if (tab.closeable) {
        return <TaClose className="tant-tab-close" onClick={() => onContextMenuClick('close', tab)} />;
    }
    return <div />;
}

export default Index;