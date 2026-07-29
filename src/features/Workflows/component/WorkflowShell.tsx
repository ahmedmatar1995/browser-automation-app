import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable.tsx'

interface WorkflowShellProps {
  workflowId: string
}

export function WorkflowShell({ workflowId }: WorkflowShellProps) {
  return (
    <ResizablePanelGroup orientation="horizontal" className="size-full">
      <ResizablePanel minSize="30rem">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel minSize="18rem">
            <div className="flex size-full items-center justify-center text-muted-foreground text-sm bg-[#0f1a1e] bg-[length:20px_20px] [background-image:radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)]">
              Canvas
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="8rem" minSize="6rem">
            <div className="flex size-full items-center justify-center text-muted-foreground text-sm bg-[#0b1519]">
              Logs
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="16rem" minSize="14rem" maxSize="36rem">
        <div className="flex size-full items-center justify-center text-muted-foreground text-sm bg-[#0d171b]">
          Inspector
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
