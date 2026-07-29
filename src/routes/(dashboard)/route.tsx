import { createFileRoute, Outlet } from '@tanstack/react-router'

import { AppSidebar } from '@/components/app-sidebar.tsx'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar.tsx'

export const Route = createFileRoute('/(dashboard)')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background! m-0! md:m-0!">
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
