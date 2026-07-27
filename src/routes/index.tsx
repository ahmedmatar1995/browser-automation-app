import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/tanstack-react-start'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-4">
        <p>tanstack start</p>
        <Show when="signed-in">
          <UserButton />
        </Show>
        <Show when="signed-out">
          <SignInButton />
          <SignUpButton />
        </Show>
      </div>
    </div>
  )
}
