'use client'

import { ModeToggle } from '@/components/theme-toggle'
import {
  OrganizationSwitcher,
  useAuth,
  UserButton,
} from '@clerk/tanstack-react-start'
import { useEffect, useState } from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from '@/components/ui/sidebar.tsx'
import { listWorkflowsServerFn } from '@/features/Workflows/actions'
import { WorkflowNav } from '@/features/Workflows/component/WorkflowNav.tsx'
import type { Workflow } from '@/lib/db/schema'

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
      className="border-r border-sidebar-border shadow-[16px_0_50px_rgba(0,0,0,0.08)] dark:shadow-[16px_0_50px_rgba(0,0,0,0.18)]"
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
                  'text-[15px]! font-bold! tracking-[-0.02em]! text-sidebar-foreground! group-data-[collapsible=icon]:hidden! capitalize!',
                organizationSwitcherTriggerIcon:
                  'text-sidebar-foreground/55! group-data-[collapsible=icon]:hidden!',
              },
            }}
          />
          <SidebarTrigger className="size-4 text-sidebar-foreground transition-all duration-200 hover:text-sidebar-foreground/60 hover:opacity-90" />
        </div>
      </SidebarHeader>
      <SidebarContent className="relative px-2 pb-3 bg-[radial-gradient(circle_at_0_0,var(--sidebar-accent)/0.15,transparent_26rem)] py-2">
        <WorkflowNav workflows={workflows} />
      </SidebarContent>
      <SidebarFooter className="m-3 mt-auto rounded-2xl p-2 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:border-0 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:p-0">
        <div className="mb-1 flex justify-start group-data-[collapsible=icon]:hidden">
          <ModeToggle />
        </div>
        <UserButton
          appearance={{
            elements: {
              rootBox:
                'w-full bg-sidebar-accent rounded-full p-2 flex items-center justify-center',
              userButtonTrigger:
                'h-10 w-full rounded-xl px-1.5 py-1.5 transition-colors hover:bg-sidebar-accent flex-row-reverse! group-data-[collapsible=icon]:justify-center',
              userButtonOuterIdentifier:
                'text-sm! font-semibold! text-sidebar-foreground/85! group-data-[collapsible=icon]:hidden flex-row-reverse',
            },
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
