import { OrganizationSwitcher, UserButton } from '@clerk/tanstack-react-start'
import { auth } from '@clerk/tanstack-react-start/server'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

export const checkAuth = createServerFn().handler(async () => {
  const { isAuthenticated, orgId } = await auth()
  if (!isAuthenticated) throw redirect({ to: '/sign-in' })
  if (!orgId) throw redirect({ to: '/choose-organization' })
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
        <UserButton />
        <OrganizationSwitcher />
      </div>
    </div>
  )
}
