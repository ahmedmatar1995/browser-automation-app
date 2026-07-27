'use client'

import { OrganizationSwitcher, UserButton } from '@clerk/tanstack-react-start'
import { Plus, Workflow } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar.tsx'

const workflows = [
  { name: 'dominant-wasp', mark: 'DW', color: '#b8a5ff' },
  { name: 'honest-reindeer', mark: 'HR', color: '#77d5c8' },
  { name: 'expected-llama', mark: 'EL', color: '#f5b97c' },
  { name: 'essential-ocelot', mark: 'EO', color: '#f09bb7' },
  { name: 'creepy-echidna', mark: 'CE', color: '#b7cc76' },
  { name: 'eastern-silkworm', mark: 'ES', color: '#8db8f5' },
  { name: 'cultural-lion', mark: 'CL', color: '#e8c176' },
  { name: 'proud-weasel', mark: 'PW', color: '#df9ded' },
  { name: 'regional-bonobo', mark: 'RB', color: '#74c8e8' },
] as const

export function AppSidebar() {
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
        <SidebarGroup className="px-1 pt-4">
          <SidebarGroupLabel className="mb-2 h-auto px-2 text-[10px] font-extrabold tracking-[0.16em] text-white/45 uppercase">
            <span>Workflows</span>
            <span className="ml-auto rounded-md border border-white/9 bg-white/4.5 px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-normal text-white/65">
              {workflows.length.toString().padStart(2, '0')}
            </span>
          </SidebarGroupLabel>
          <SidebarGroupAction
            aria-label="Create workflow"
            className="top-3.5 right-3 size-7! rounded-lg border border-violet-300/20 bg-violet-400/10 text-violet-200 shadow-[0_5px_16px_rgba(139,92,246,0.15)] transition-all hover:-translate-y-0.5 hover:bg-violet-400/20 hover:text-white"
          >
            <Plus />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {workflows.map((workflow, index) => (
                <SidebarMenuItem key={workflow.name} className="group/workflow">
                  <SidebarMenuButton
                    isActive={index === 0}
                    tooltip={workflow.name}
                    aria-current={index === 0 ? 'page' : undefined}
                    className="h-14 rounded-xl px-2.5 py-2 text-white/65 transition-all duration-200 hover:translate-x-0.5 hover:bg-white/[0.07] hover:text-white data-[active=true]:bg-[linear-gradient(104deg,rgba(167,139,250,0.22),rgba(139,92,246,0.08))] data-[active=true]:text-white data-[active=true]:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_8px_24px_rgba(76,29,149,0.16)]"
                  >
                    <Workflow className="hidden text-violet-200 group-data-[collapsible=icon]:block" />
                    <span className="flex min-w-0 items-center gap-3 group-data-[collapsible=icon]:hidden">
                      <span
                        className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/4.5 font-mono text-[10px] font-bold tracking-[-0.06em] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                        style={{ color: workflow.color }}
                      >
                        {workflow.mark}
                      </span>
                      <span className="min-w-0 truncate text-[15px] font-semibold tracking-[-0.015em]">
                        {workflow.name}
                      </span>
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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
