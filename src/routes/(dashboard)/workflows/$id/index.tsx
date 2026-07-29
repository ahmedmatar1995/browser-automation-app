import {
  AlertTriangle,
  FileQuestion,
  Loader2Icon,
  RefreshCw,
} from 'lucide-react'

import { createFileRoute, useParams } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'

import { Button } from '@/components/ui/button.tsx'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty.tsx'
import { WorkflowShell } from '@/features/Workflows/component/WorkflowShell.tsx'

export const Route = createFileRoute('/(dashboard)/workflows/$id/')({
  component: RouteComponent,
  pendingComponent: () => {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex items-center justify-center">
          <Loader2Icon className="size-5 animate-spin text-foreground" />
        </div>
      </div>
    )
  },
  notFoundComponent: () => {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileQuestion className="size-6" />
          </EmptyMedia>
          <EmptyTitle>Workflow not found</EmptyTitle>
        </EmptyHeader>
        <EmptyContent>
          <EmptyDescription>
            The workflow you're looking for doesn't exist or has been removed.
          </EmptyDescription>
        </EmptyContent>
      </Empty>
    )
  },
  errorComponent: ({ error, reset }: ErrorComponentProps) => {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertTriangle className="size-6" />
          </EmptyMedia>
          <EmptyTitle>Something went wrong</EmptyTitle>
        </EmptyHeader>
        <EmptyContent>
          <EmptyDescription>
            {error.message ||
              'An unexpected error occurred while loading this workflow.'}
          </EmptyDescription>
          <Button
            onClick={reset}
            size="lg"
            className="mt-2 h-12 rounded-xl bg-primary px-5 text-sm font-extrabold text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary/90"
          >
            <RefreshCw className="mr-2 size-4" /> Try again
          </Button>
        </EmptyContent>
      </Empty>
    )
  },
})

function RouteComponent() {
  const { id } = useParams({ from: '/(dashboard)/workflows/$id/' })
  return <WorkflowShell workflowId={id} />
}
