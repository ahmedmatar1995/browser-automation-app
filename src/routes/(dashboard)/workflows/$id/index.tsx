import {
  AlertTriangle,
  FileQuestion,
  Loader2Icon,
  RefreshCw,
} from 'lucide-react'

import type { ErrorComponentProps } from '@tanstack/react-router'
import { createFileRoute, redirect, useParams } from '@tanstack/react-router'

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
import { Room } from '../../../../features/Workflows/component/room'
import { auth } from '@clerk/tanstack-react-start/server'
import { createServerFn } from '@tanstack/react-start'
import { getWorkflow } from '../../../../features/Workflows/data'
import { liveblocks } from '@/lib/liveblocks'

const setupRoom = createServerFn({ method: 'GET' })
  .validator((data: { roomId: string }) => data)
  .handler(async ({ data }) => {
    const { orgId } = await auth();
    if (!orgId) throw redirect({ to: '/' });

    await liveblocks.getOrCreateRoom(data.roomId, {
      organizationId: orgId,
      defaultAccesses: [],
      groupsAccesses: {
        [orgId]: ['room:write'],
      },
    });
  });

const fetchWorkflow = createServerFn({ method: 'GET' })
  .validator((data: { workflowId: string }) => data)
  .handler(async ({ data }) => {
    const { orgId } = await auth();
    if (!orgId) throw redirect({ to: '/' });

    return await getWorkflow(orgId, data.workflowId);
  });

export const Route = createFileRoute('/(dashboard)/workflows/$id/')({
  beforeLoad: async ({ params }) => {
    await setupRoom({ data: { roomId: params.id } });
  },
  loader: async ({ params }) => {
    return await fetchWorkflow({ data: { workflowId: params.id } });
  },
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
  return (
    <Room key={id} roomId={id}>
      <WorkflowShell workflowId={id} />
    </Room>
  )
}
