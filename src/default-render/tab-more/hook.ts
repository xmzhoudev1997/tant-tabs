import { useEffect, useRef, useState } from "react";
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
    const [container, setContainer] = useState(null);
    const filterList = useMemo(() => props.tabList?.filter((d: RC_TAB) => !kwd?.trim() || (props.onFilter ? props.onFilter(d, kwd) : pinyinMatch.match(d.label, kwd))), [kwd, props.tabList]);
    useTabsDrag({
        container,
        dragClass: 'tant-more-tab-drag',
        draggingClass: 'tant-more-tab-dragging',
        onDragEnd: props.onDrag,
        asix: 'y',
        dragStartTrigger: 5,
    })
    useEffect(() => {
        setContainer(props.tabDrag && !kwd.length ? scrollRef.current : null)
    }, [scrollRef.current, props.tabDrag, kwd.length, open])
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