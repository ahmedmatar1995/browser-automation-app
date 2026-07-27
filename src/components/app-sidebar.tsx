'use client'

import { OrganizationSwitcher, UserButton } from '@clerk/tanstack-react-start'
import { History, Home, Settings, Workflow } from 'lucide-react'
import { Link } from '@tanstack/react-router'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar.tsx'

const items = [
  { title: 'Home', url: '/', icon: Home },
  { title: 'Workflows', url: '/workflows', icon: Workflow },
  { title: 'History', url: '/history', icon: History },
  { title: 'Settings', url: '/settings', icon: Settings },
]

export function AppSidebar() {
  return (
    <Sidebar
      collapsible="icon"
      style={{ '--sidebar': '#1B1B1B' } as React.CSSProperties}
    >
      <SidebarHeader className="py-2!">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          appearance={{
            elements: {
              organizationSwitcherTrigger:
                'w-full! group-data-[collapsible=icon]:w-auto! justify-between! group-data-[collapsible=icon]:justify-center!',
              organizationPreviewMainIdentifier:
                'text-white! group-data-[collapsible=icon]:hidden!',
              organizationSwitcherTriggerIcon:
                'text-white! group-data-[collapsible=icon]:hidden!',
            },
          }}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserButton showName />
      </SidebarFooter>
    </Sidebar>
  )
}
