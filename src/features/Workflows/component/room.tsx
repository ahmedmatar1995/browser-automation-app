

import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from '@liveblocks/react/suspense';
import { Loader2Icon } from 'lucide-react';
import type { ReactNode } from 'react';

export function Room({
  roomId,
  children,
}: {
  roomId: string;
  children: ReactNode;
}) {
  return (
    <LiveblocksProvider
      authEndpoint="/liveblocks/auth"

    >
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<div className='flex min-h-svh items-center justify-center'>
          <Loader2Icon className='size-6 text-muted-foreground animate-spin' />
        </div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
