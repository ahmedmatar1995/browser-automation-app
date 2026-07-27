import { createFileRoute, Outlet } from '@tanstack/react-router'

import { AppSidebar } from '@/components/app-sidebar.tsx'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar.tsx'

export const Route = createFileRoute('/(dashboard)')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger className="ml-1 mt-1" />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
