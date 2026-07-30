import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable.tsx';
import { Canvas } from '@/features/Workflows/component/canvas.tsx';
import { RightSidebar } from '@/features/Workflows/component/right-sidebar.tsx';

interface WorkflowShellProps {
  workflowId: string;
}

export function WorkflowShell({ workflowId }: WorkflowShellProps) {
  return (
    <ResizablePanelGroup orientation="horizontal" className="size-full">
      <ResizablePanel minSize="30rem">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel minSize="18rem">
            <Canvas />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="8rem" minSize="6rem">
            <div className="flex size-full items-center justify-center text-muted-foreground text-sm bg-muted/50">
              Logs
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="16rem" minSize="14rem" maxSize="36rem">
        <RightSidebar />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
