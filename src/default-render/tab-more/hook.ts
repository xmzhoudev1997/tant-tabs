import { useRef, useState } from "react";
import { RC_TAB, useTabsDrag } from '@tant/rc-tabs';
import { useMemo } from "react";
import pinyinMatch from 'pinyin-match';
import { TABS_NAV } from '.././../nav/props';

export default (
    props: TABS_NAV,
) => {
    const [kwd, setKwd] = useState('');
    const [open, setOpen] = useState(false);
    const scrollRef = useRef(null); 
    const filterList = useMemo(() => kwd.length ? props.tabList?.filter((d: RC_TAB) => pinyinMatch.match(d.label, kwd)) : props.tabList, [kwd, props.tabList]);
    useTabsDrag({
        container: props.tabDrag && !kwd.length ? scrollRef.current : null,
        dragClass: 'tant-more-tab-drag',
        draggingClass: 'tant-more-tab-dragging',
        onDragEnd: props.onDrag,
        asix: 'y',
        dragStartTrigger: 5,
      })
    return {
        kwd,
        setKwd,
        filterList,
        disable: !!kwd.length,
        open,
        setOpen,
        scrollRef,
    };
}