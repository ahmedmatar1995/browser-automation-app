'use client'

import { Link, useMatch } from '@tanstack/react-router'
import { Plus, Workflow as WorkflowIcon } from 'lucide-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.tsx'
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar.tsx'
import type { Workflow } from '@/lib/db/schema'
import { createWorkflowAction } from '@/features/Workflows/actions'
import { generateSlug } from '@/features/Workflows/lib/generateSlug'

const colors = [
  '#b8a5ff',
  '#77d5c8',
  '#f5b97c',
  '#f09bb7',
  '#b7cc76',
  '#8db8f5',
  '#e8c176',
  '#df9ded',
  '#74c8e8',
  '#f5a97f',
]

function getMark(name: string) {
  return name
    .split('-')
    .map((w) => w.charAt(0).toUpperCase())
    .join('')
}

function getColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

export function WorkflowNav({ workflows }: { workflows: Workflow[] }) {
  const { state } = useSidebar()

  async function handleCreate() {
    const name = generateSlug()
    await createWorkflowAction({ data: { name } })
  }

  if (state === 'collapsed') {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button
            aria-label="Open workflows"
            className="mx-auto grid size-10 place-items-center rounded-xl border border-violet-300/20 bg-violet-400/10 text-violet-200 shadow-[0_5px_16px_rgba(139,92,246,0.15)] transition-all hover:-translate-y-0.5 hover:bg-violet-400/20 hover:text-white focus-visible:ring-2 focus-visible:ring-violet-300/70 focus-visible:outline-hidden"
          >
            <WorkflowIcon className="size-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          side="right"
          align="start"
          sideOffset={12}
          className="w-80 border-white/10 bg-[#17171d] p-2 text-white shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
          style={
            {
              '--sidebar-accent': '#24242c',
              '--sidebar-accent-foreground': '#ffffff',
            } as React.CSSProperties
          }
        >
          <WorkflowList workflows={workflows} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <SidebarGroup className="px-1 pt-4 mb-4">
      <span className="text-md font-bold tracking-wide underline underline-offset-4">
        Workflows
      </span>
      <SidebarGroupAction
        aria-label="Create workflow"
        onClick={handleCreate}
        className="top-3.5 -bottom-4 right-3 size-7! cursor-pointer rounded-lg border border-violet-300/20 bg-violet-400/10 text-violet-200 shadow-[0_5px_16px_rgba(139,92,246,0.15)] transition-all hover:-translate-y-0.5 hover:bg-violet-400/20 hover:text-white"
      >
        <Plus />
      </SidebarGroupAction>
      <SidebarGroupContent>
        <WorkflowList workflows={workflows} />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

function WorkflowList({ workflows }: { workflows: Workflow[] }) {
  const match = useMatch({
    from: '/(dashboard)/workflows/$id/',
    shouldThrow: false,
  })
  const activeId = match?.params.id

  return (
    <SidebarMenu className="gap-1.5 mt-12">
      {workflows.map((workflow) => (
        <SidebarMenuItem key={workflow.id} className="group/workflow">
          <SidebarMenuButton
            asChild
            isActive={workflow.id === activeId}
            className="h-14 rounded-xl px-2.5 py-2 text-white/65 transition-all duration-200 hover:translate-x-0.5 hover:bg-white/[0.07] hover:text-white data-[active=true]:bg-[linear-gradient(104deg,rgba(167,139,250,0.22),rgba(139,92,246,0.08))] data-[active=true]:text-white data-[active=true]:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_8px_24px_rgba(76,29,149,0.16)]"
          >
            <Link
              to="/workflows/$id"
              params={{ id: workflow.id }}
              className="flex min-w-0 items-center gap-3"
            >
              <span
                className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/4.5 font-mono text-[10px] font-bold tracking-[-0.06em] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                style={{ color: getColor(workflow.name) }}
              >
                {getMark(workflow.name)}
              </span>
              <span className="min-w-0 truncate text-[15px] font-semibold tracking-[-0.015em]">
                {workflow.name}
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
