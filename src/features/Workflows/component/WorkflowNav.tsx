'use client'

import { Plus, Workflow } from 'lucide-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.tsx'
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
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

export function WorkflowNav() {
  const { state } = useSidebar()

  if (state === 'collapsed') {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button
            aria-label="Open workflows"
            className="mx-auto grid size-10 place-items-center rounded-xl border border-violet-300/20 bg-violet-400/10 text-violet-200 shadow-[0_5px_16px_rgba(139,92,246,0.15)] transition-all hover:-translate-y-0.5 hover:bg-violet-400/20 hover:text-white focus-visible:ring-2 focus-visible:ring-violet-300/70 focus-visible:outline-hidden"
          >
            <Workflow className="size-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          side="right"
          align="start"
          sideOffset={12}
          className="w-80 border-white/10 bg-[#17171d] p-2 text-white shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
        >
          <WorkflowHeader />
          <WorkflowList />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <SidebarGroup className="px-1 pt-4">
      <WorkflowHeader />
      <SidebarGroupAction
        aria-label="Create workflow"
        className="top-3.5 right-3 size-7! rounded-lg border border-violet-300/20 bg-violet-400/10 text-violet-200 shadow-[0_5px_16px_rgba(139,92,246,0.15)] transition-all hover:-translate-y-0.5 hover:bg-violet-400/20 hover:text-white"
      >
        <Plus />
      </SidebarGroupAction>
      <SidebarGroupContent>
        <WorkflowList />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

function WorkflowHeader() {
  return (
    <SidebarGroupLabel className="mb-2 h-auto px-2 text-[10px] font-extrabold tracking-[0.16em] text-white/45 uppercase">
      <span>Workflows</span>
      <span className="ml-auto rounded-md border border-white/9 bg-white/4.5 px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-normal text-white/65">
        {workflows.length.toString().padStart(2, '0')}
      </span>
    </SidebarGroupLabel>
  )
}

function WorkflowList() {
  return (
    <SidebarMenu className="gap-1.5">
      {workflows.map((workflow, index) => (
        <SidebarMenuItem key={workflow.name} className="group/workflow">
          <SidebarMenuButton
            isActive={index === 0}
            aria-current={index === 0 ? 'page' : undefined}
            className="h-14 rounded-xl px-2.5 py-2 text-white/65 transition-all duration-200 hover:translate-x-0.5 hover:bg-white/[0.07] hover:text-white data-[active=true]:bg-[linear-gradient(104deg,rgba(167,139,250,0.22),rgba(139,92,246,0.08))] data-[active=true]:text-white data-[active=true]:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_8px_24px_rgba(76,29,149,0.16)]"
          >
            <span className="flex min-w-0 items-center gap-3">
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
  )
}
