import { useState } from 'react'
import { Loader2Icon, PlayIcon } from 'lucide-react'

import { useRealtimeRun } from '@trigger.dev/react-hooks'
import type { helloWorldTask } from '@/trigger/example'

import { Button } from '@/components/ui/button.tsx'
import { runWorkflowAction } from '@/features/Workflows/actions'

type RunHandle = { id: string; publicAccessToken: string }

export function RightSidebar() {
  const [handle, setHandle] = useState<RunHandle | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { run } = useRealtimeRun<typeof helloWorldTask>(handle?.id!, {
    accessToken: handle?.publicAccessToken,
    enabled: !!handle,
    skipColumns: ['payload', 'output'],
  })

  return (
    <div className="flex size-full flex-col items-center justify-center gap-4 bg-[#111114]">
      <Button
        disabled={isLoading}
        onClick={async () => {
          setIsLoading(true)
          try {
            const result = await runWorkflowAction()
            setHandle(result)
          } finally {
            setIsLoading(false)
          }
        }}
      >
        {isLoading ? <Loader2Icon className="animate-spin" /> : <PlayIcon />}
        {isLoading ? 'Running...' : 'Run'}
      </Button>
      {run && (
        <span className="text-xs capitalize text-muted-foreground">
          {run.status}
        </span>
      )}
    </div>
  )
}
