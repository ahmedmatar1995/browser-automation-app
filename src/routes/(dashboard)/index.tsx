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
    <div className="flex flex-1 items-center justify-center bg-[#1b1b1f] px-6 py-16">
      <section className="w-full max-w-lg text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-2xl border border-violet-200/15 bg-violet-400/10 text-violet-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
          <Workflow className="size-7" strokeWidth={1.5} />
        </div>
        <p className="mt-7 text-[10px] font-extrabold tracking-[0.16em] text-violet-200/60 uppercase">
          Workflow library
        </p>
        <h1 className="mt-3 font-[Fraunces,serif] text-4xl font-medium tracking-[-0.04em] text-[#f7f4ff] sm:text-5xl">
          No workflow selected
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-base leading-7 text-white/50">
          Choose a workflow from the sidebar, or start a new one from scratch.
        </p>
        <Button
          size="lg"
          className="mt-8 h-12 rounded-xl bg-violet-300 px-5 text-sm font-extrabold text-[#17151e] shadow-[0_12px_30px_rgba(139,92,246,0.24)] transition-all hover:-translate-y-0.5 hover:bg-violet-200"
        >
          Create workflow <Plus className="size-4" />
        </Button>
      </section>
    </div>
  )
}
