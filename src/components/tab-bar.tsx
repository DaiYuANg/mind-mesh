// TabBar.tsx
import { useState, useRef, useEffect } from 'react'
import { BrowserTab } from './browser-tab.tsx'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area.tsx'

type TabData = {
  id: number
  title: string
}

export const TabBar = () => {
  const [tabs, setTabs] = useState<TabData[]>([
    { id: 1, title: 'Dashboard' },
    { id: 2, title: 'Users' },
    { id: 3, title: 'Orders' },
    { id: 4, title: 'Settings' },
  ])
  const [activeTabId, setActiveTabId] = useState<number>(1)
  const [untitledCount, setUntitledCount] = useState(1)

  const containerRef = useRef<HTMLDivElement>(null)

  const handleNewTab = () => {
    const newId = Math.max(...tabs.map((t) => t.id)) + 1
    const newTab: TabData = { id: newId, title: `Untitled ${untitledCount}` }
    setTabs([...tabs, newTab])
    setActiveTabId(newId)
    setUntitledCount(untitledCount + 1)
  }

  const handleCloseTab = (id: number) => {
    const filtered = tabs.filter((t) => t.id !== id)
    setTabs(filtered)
    if (activeTabId === id && filtered.length > 0) {
      setActiveTabId(filtered[0].id)
    }
  }

  // 自动滚动到激活 tab
  useEffect(() => {
    const activeEl = containerRef.current?.querySelector<HTMLDivElement>('.active-tab')
    activeEl?.scrollIntoView({ behavior: 'smooth', inline: 'center' })
  }, [activeTabId])

  return (
    <>
      <ScrollArea className="w-100 rounded-md whitespace-nowrap">
        <div className="border-b bg-muted/40 flex w-max space-x-4 p-3" ref={containerRef}>
          <div className="flex h-10 items-end gap-1 flex-nowrap min-w-max">
            {tabs.map((tab) => (
              <BrowserTab
                key={tab.id}
                active={tab.id === activeTabId}
                title={tab.title}
                onClick={() => setActiveTabId(tab.id)}
                onClose={() => handleCloseTab(tab.id)}
              />
            ))}

            {/* 新建 Tab 按钮 */}
            <div
              onClick={handleNewTab}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded hover:bg-accent/60 cursor-pointer"
            >
              +
            </div>
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  )
}
