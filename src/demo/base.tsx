

import React, { useRef } from 'react';
import { useSetState } from 'ahooks';
import { TabsNav } from '@tant/tabs';
import { RC_TAB } from '@tant/rc-tabs';
import { TaLanguage } from '@tant/icons';

export default () => {
  const [state, setState] = useSetState<any>({
    tabList: [{
      key: '1',
      label: '1',
    }],
    tabKey: '1',
  });
  return (
    <div style={{
      display: 'flex',
      height: 400,
      flexDirection: 'column',
    }}>
      <TabsNav
        tabKey={state.tabKey}
        tabList={state.tabList}
        onTabKeyChange={(key: string) => {
          setState({
            tabKey: key,
          })
        }}
        tabDrag
        onTabContextMenuClick={(key: string) => {
          if (key === 'add') {
            const obj = {
              label: `空白标签页${Date.now()}`,
              closeable: true,
              fixed: false,
              key: String(Date.now()),
            };
            state.tabList.push(obj);
            setState({
              tabKey: obj.key,
              tabList: [...state.tabList]
            })
          }
        }}
        tabIconRender={() => {
          return <TaLanguage style={{ display: 'flex' }} />
        }}
        tabContextMenus={(tab: RC_TAB) => {
          const contextMenus = [
            {
              key: 'fixed',
              label: tab.fixed ? '取消固定' : '固定标签页',
            },
            {
              key: 'divider1',
              type: 'divider',
            },
            {
              key: 'close-other',
              label: '关闭其他',
            },
            {
              key: 'close-right',
              label: '关闭右侧',
              shortcutKeys: ['command'],
            },
            {
              key: 'close-all',
              label: '关闭所有',
            },
            {
              key: 'close-saved',
              label: '关闭已保存',
            },
          ];
          if (tab.closeable) {
            contextMenus.splice(2, 0, {
              key: 'close',
              label: '关闭',
            });
          }
          return contextMenus;
        }}
        // tabTipRender={(tab: XM_TAB) => {
        //   return <>
        //     <div style={{
        //       display: 'flex',
        //       alignItems: 'center',
        //       columnGap: 4,
        //       color: 'var(--tant-text-white-color-text2-1)'
        //     }}>
        //       <TaLanguage style={{ color: '#1E76F0' }} />
        //       {tab.label}
        //     </div>
        //     <div style={{
        //       color: '#FFFFFFB2',
        //       font: 'var(    --tant-description-font-description-regular)'
        //     }}>
        //       最近编辑：03/28 19:00
        //     </div>
        //   </>
        // }}
      />
      {/* <TabsPanel
        ref={panelRef}
      >
        {(tabKey: string) => {
          console.log(tabKey);
          const tab = state.tabList.find(t => t.key === tabKey);
          return <div
            style={{ height: '100%' }}
            suppressContentEditableWarning
            contentEditable
            onInput={(e) => {
              navRef.current?.edited(tabKey, true)
            }}
          >{tab?.label}</div>;
        }}
      </TabsPanel> */}
    </div>
  );
}