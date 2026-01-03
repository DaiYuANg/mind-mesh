import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar.tsx'
import { SidebarLeft } from '@/components/sidebar-left.tsx'

import { Separator } from '@radix-ui/react-separator'
import { FC } from 'react'
import { SidebarRight } from './sidebar-right'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb.tsx'
import { Outlet } from 'react-router'
import { TabBar } from '@/components/tab-bar.tsx'
import { ScrollArea } from '@/components/ui/scroll-area.tsx'

const Layout: FC = () => {
  return (
    <>
      <SidebarProvider>
        <SidebarLeft />
        <SidebarInset>
          <header className="bg-background sticky top-0 flex h-14 shrink-0 items-center gap-2">
            <div className="flex flex-1 items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
              <TabBar />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">Project Management & Task Tracking</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <ScrollArea className={['fixed h-9/12'].join(' ')}>
              <Outlet />
            </ScrollArea>
          </div>
        </SidebarInset>
        <SidebarRight />
      </SidebarProvider>
    </>
  )
}


export { Layout }
