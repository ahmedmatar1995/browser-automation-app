import { auth } from '@clerk/tanstack-react-start/server'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { Plus, Workflow } from 'lucide-react'

import { Button } from '@/components/ui/button.tsx'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty.tsx'

export const checkAuth = createServerFn().handler(async () => {
  const { isAuthenticated, orgId } = await auth()
  if (!isAuthenticated) throw redirect({ to: '/sign-in' })
  if (!orgId) throw redirect({ to: '/choose-organization' })
})

export const Route = createFileRoute('/(dashboard)/')({
  component: Home,
  beforeLoad: async () => await checkAuth(),
})

function FlowchartIllustration() {
  return (
    <div className="inline-flex items-center justify-center rounded-xl bg-neutral-800 p-4">
      <Workflow className="size-10 text-neutral-300" strokeWidth={1.5} />
    </div>
  )
}

function Home() {
  return (
    <div className="flex flex-1 bg-[#1B1B1B]">
      <Empty>
        <EmptyMedia className="w-full max-w-4xl">
          <FlowchartIllustration />
        </EmptyMedia>
        <EmptyHeader className="gap-6">
          <EmptyTitle className="text-4xl font-bold tracking-tight text-neutral-100">
            No workflow selected
          </EmptyTitle>
          <Button
            size="lg"
            className="bg-[#44ba82] px-8 text-white hover:bg-[#44ba82]/90 font-medium tracking-wide"
          >
            New WorkFlow <Plus className="size-4" />
          </Button>
          <EmptyDescription className="max-w-md text-base leading-7 tracking-wide text-neutral-400">
            Choose a workflow from the sidebar to begin editing
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  )
}
