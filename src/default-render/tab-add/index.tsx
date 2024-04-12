// @ts-nocheck
import { Button } from '@tant/ui-next';
import React, { FC } from 'react';
import { TaAdd1 } from '@tant/icons';
import { TABS_NAV } from '../../nav/props';

interface Props {
    onContextMenuClick: TABS_NAV['onTabContextMenuClick'];
    disabled: boolean,
}

const Index: FC<Props> = ({
    onContextMenuClick = () => {}, disabled
}) => {
    return (
        <Button
            onClick={() => onContextMenuClick('add')}
            icon={<TaAdd1 />}
            type="text"
            disabled={disabled}
        />
    );
}

export default Index;