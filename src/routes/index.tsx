import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="p-8">
      <div>
        <p>tanstack start</p>
        <Button onClick={() => toast('Hello from TanStack Start!')}>
          click
        </Button>
      </div>
    </div>
  )
}
