import { UserButton } from '@clerk/tanstack-react-start'
import { auth } from '@clerk/tanstack-react-start/server'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

const authStateFn = createServerFn({ method: 'GET' }).handler(async () => {
  const { isAuthenticated } = await auth()

  if (!isAuthenticated) {
    throw redirect({
      to: '/sign-in',
    })
  }
})

export const Route = createFileRoute('/test')({
  beforeLoad: async () => {
    await authStateFn()
  },
  component: Test,
})

function Test() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Test Page</h1>
        <UserButton />
      </div>
      <p className="mt-4">
        This is a protected test page. Only authenticated users can see this.
      </p>
    </div>
  )
}
