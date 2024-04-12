import { RC_TAB } from "@tant/rc-tabs";
import { useState } from "react";
import { TABS_NAV, TABS_NAV_CONTEXT_MENU_KEY } from "xm-tabs/nav/props";

export default (
    onContextMenuClick: TABS_NAV['onTabContextMenuClick'] = () => {},
) => {
    const [key, setKey] = useState('');
    const handleClick = ( key: TABS_NAV_CONTEXT_MENU_KEY, tab: RC_TAB) => {
        setKey('');
        onContextMenuClick(key , tab);
    }
    return {
        key,
        setKey,
        handleClick,
    };
}