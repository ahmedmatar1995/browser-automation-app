'use client';

import { GripVerticalIcon } from 'lucide-react';
import * as ResizablePrimitive from 'react-resizable-panels';

import { cn } from '#/lib/utils.ts';

function ResizablePanelGroup({
  className,
  ...props
}: ResizablePrimitive.GroupProps) {
  return (
    <ResizablePrimitive.Group
      data-slot="resizable-panel-group"
      className={cn(
        'flex h-full w-full aria-[orientation=vertical]:flex-col',
        className,
      )}
      {...props}
    />
  );
}

type PanelSize = string | number;

function remToPixels(value: string): number {
  const num = Number.parseFloat(value);
  if (value.endsWith('rem')) return num * 16;
  if (value.endsWith('px')) return num;
  return num;
}

interface ResizablePanelProps extends Omit<
  ResizablePrimitive.PanelProps,
  | 'minSize'
  | 'defaultSize'
  | 'maxSize'
  | 'minSizePixels'
  | 'defaultSizePixels'
  | 'maxSizePixels'
> {
  minSize?: PanelSize;
  defaultSize?: PanelSize;
  maxSize?: PanelSize;
}

function ResizablePanel({
  minSize,
  defaultSize,
  maxSize,
  ...props
}: ResizablePanelProps) {
  return (
    <ResizablePrimitive.Panel
      data-slot="resizable-panel"
      minSizePixels={
        typeof minSize === 'string' ? remToPixels(minSize) : undefined
      }
      defaultSizePixels={
        typeof defaultSize === 'string' ? remToPixels(defaultSize) : undefined
      }
      maxSizePixels={
        typeof maxSize === 'string' ? remToPixels(maxSize) : undefined
      }
      minSize={typeof minSize === 'number' ? minSize : undefined}
      defaultSize={typeof defaultSize === 'number' ? defaultSize : undefined}
      maxSize={typeof maxSize === 'number' ? maxSize : undefined}
      {...props}
    />
  );
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: ResizablePrimitive.SeparatorProps & {
  withHandle?: boolean;
}) {
  return (
    <ResizablePrimitive.Separator
      data-slot="resizable-handle"
      className={cn(
        'relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:outline-hidden aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90',
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-xs border bg-border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </ResizablePrimitive.Separator>
  );
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
