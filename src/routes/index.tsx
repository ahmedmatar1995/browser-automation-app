import { auth } from '@clerk/tanstack-react-start/server'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

export const checkAuth = createServerFn().handler(async () => {
  const { isAuthenticated } = await auth()
  if (!isAuthenticated) throw redirect({ to: '/sign-in/$' })
})

export const Route = createFileRoute('/')({
  component: Home,
  beforeLoad: async () => await checkAuth(),
})

function Home() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-4">
        <p>tanstack start</p>
      </div>
    </div>
  )
}
