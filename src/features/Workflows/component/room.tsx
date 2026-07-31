

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
      resolveUsers={async ({ userIds }) => {
        try {
          const res = await fetch('/liveblocks/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userIds }),
          });
          if (!res.ok) return undefined;
          const users = (await res.json()) as Array<{
            name: string;
            avatar: string;
          } | null>;
          return users.map((u) => u ?? undefined);
        } catch {
          return undefined;
        }
      }}
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
