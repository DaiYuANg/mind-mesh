import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar.tsx'
import { SidebarLeft } from '@/components/sidebar-left.tsx'
import { SidebarRight } from '@/components/sidebar-right.tsx'

import { Outlet } from 'react-router'
import { Separator } from '@radix-ui/react-separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb.tsx'
import { BrowserTab } from '@/components/browser-tab.tsx'
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

const Layout = () => {
  return (
    <>
      <SidebarProvider>
        <SidebarLeft />
        <SidebarInset>
          <ScrollArea>
            <header className="bg-background sticky top-0 flex h-14 shrink-0 items-center gap-2">
              <div className="flex flex-1 items-center gap-2 px-3">
                <SidebarTrigger />
                <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                <div className="border-b bg-muted/40">
                  <div className="flex h-10 items-end px-2 gap-1">
                    <BrowserTab active title="Dashboard" />
                    <BrowserTab title="Users" />
                    <BrowserTab title="Orders" />
                    <BrowserTab title="Settings" />
                  </div>
                </div>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbPage className="line-clamp-1">Project Management & Task Tracking</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">
              {/*<div className="bg-muted/50 mx-auto h-24 w-full max-w-3xl rounded-xl"/>*/}
              <div className="bg-muted/50 mx-auto h-screen w-full max-w-3xl rounded-xl">
                <Outlet />
              </div>
            </div>
          </ScrollArea>
        </SidebarInset>
        {/*<SidebarRight />*/}
      </SidebarProvider>
    </>
  )
}

export { Layout }
