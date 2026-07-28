'use client'

import {
  useAuth,
  OrganizationSwitcher,
  UserButton,
} from '@clerk/tanstack-react-start'
import { useEffect, useState } from 'react'

import { listWorkflowsServerFn } from '@/features/Workflows/actions'
import { WorkflowNav } from '@/features/Workflows/component/WorkflowNav.tsx'
import type { Workflow } from '@/lib/db/schema'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from '@/components/ui/sidebar.tsx'

export function AppSidebar() {
  const { orgId } = useAuth()
  const [workflows, setWorkflows] = useState<Workflow[]>([])

  useEffect(() => {
    if (!orgId) {
      setWorkflows([])
      return
    }
    listWorkflowsServerFn({ data: { orgId } }).then(setWorkflows)
  }, [orgId])

  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      className="border-r border-white/[0.07] bg-[#111114] shadow-[16px_0_50px_rgba(0,0,0,0.18)]"
      style={
        {
          '--sidebar': '#111114',
          '--sidebar-foreground': '#f7f7fb',
          '--sidebar-primary': '#a78bfa',
          '--sidebar-primary-foreground': '#121217',
          '--sidebar-accent': '#24242c',
          '--sidebar-accent-foreground': '#ffffff',
          '--sidebar-border': 'rgba(255, 255, 255, 0.08)',
          '--sidebar-ring': '#c4b5fd',
        } as React.CSSProperties
      }
    >
      <SidebarHeader className="px-3 pt-3 pb-2">
        <div className="flex items-center justify-center gap-2 group-data-[collapsible=icon]:gap-0">
          <OrganizationSwitcher
            hidePersonal
            afterCreateOrganizationUrl="/"
            afterSelectOrganizationUrl="/"
            appearance={{
              elements: {
                rootBox: 'w-full!',
                organizationSwitcherTrigger:
                  'h-13 w-full! rounded-2xl px-2.5! transition-colors group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:justify-center! group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:hidden!',
                organizationPreviewMainIdentifier:
                  'text-[15px]! font-bold! tracking-[-0.02em]! text-white! group-data-[collapsible=icon]:hidden! capitalize!',
                organizationSwitcherTriggerIcon:
                  'text-white/55! group-data-[collapsible=icon]:hidden!',
              },
            }}
          />
          <SidebarTrigger className="size-4 text-white hover:opacity-90 transition-all hover:text-white/60 duration-200" />
        </div>
      </SidebarHeader>
      <SidebarContent className="relative px-2 pb-3 bg-[radial-gradient(circle_at_0_0,rgba(167,139,250,0.1),transparent_26rem)] py-2">
        <WorkflowNav workflows={workflows} />
      </SidebarContent>
      <SidebarFooter className="m-3 mt-auto rounded-2xl p-2 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:border-0 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:p-0">
        <UserButton
          appearance={{
            elements: {
              rootBox:
                'w-full bg-foreground/10 rounded-full p-2 flex items-center justify-center',
              userButtonTrigger:
                'h-10 w-full rounded-xl px-1.5 py-1.5 transition-colors hover:bg-white/[0.07] group-data-[collapsible=icon]:justify-center flex-row-reverse!',
              userButtonOuterIdentifier:
                'text-sm! font-semibold! text-white/85! group-data-[collapsible=icon]:hidden flex-row-reverse',
            },
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
