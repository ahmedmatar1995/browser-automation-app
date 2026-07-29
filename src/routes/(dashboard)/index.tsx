import { auth } from '@clerk/tanstack-react-start/server'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { Plus, Workflow } from 'lucide-react'

import { Button } from '@/components/ui/button.tsx'

export const checkAuth = createServerFn().handler(async () => {
  const { isAuthenticated, orgId } = await auth()
  if (!isAuthenticated) throw redirect({ to: '/sign-in' })
  if (!orgId) throw redirect({ to: '/choose-organization' })
})

export const Route = createFileRoute('/(dashboard)/')({
  component: Home,
  beforeLoad: async () => await checkAuth(),
})

function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-background px-6 py-16">
      <section className="w-full max-w-lg text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-2xl border border-primary/15 bg-primary/10 text-primary shadow-[inset_0_1px_0_var(--border)]">
          <Workflow className="size-7" strokeWidth={1.5} />
        </div>
        <p className="mt-7 text-[10px] font-extrabold tracking-[0.16em] text-muted-foreground uppercase">
          Workflow library
        </p>
        <h1 className="mt-3 font-[Fraunces,serif] text-4xl font-medium tracking-[-0.04em] text-foreground sm:text-5xl">
          No workflow selected
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-base leading-7 text-muted-foreground">
          Choose a workflow from the sidebar, or start a new one from scratch.
        </p>
        <Button
          size="lg"
          className="mt-8 h-12 rounded-xl bg-primary px-5 text-sm font-extrabold text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary/90"
        >
          Create workflow <Plus className="size-4" />
        </Button>
      </section>
    </div>
  )
}
