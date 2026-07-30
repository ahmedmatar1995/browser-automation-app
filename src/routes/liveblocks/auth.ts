import { createFileRoute } from '@tanstack/react-router';
import { auth } from '@clerk/tanstack-react-start/server';

import { liveblocks } from '@/lib/liveblocks';

export const Route = createFileRoute('/liveblocks/auth')({
  server: {
    handlers: {
      POST: async () => {
        const { userId, orgId } = await auth();

        if (!userId || !orgId)
          return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
          });

        const groupIds: string[] = [];
        if (orgId) {
          groupIds.push(orgId);
        }

        const { status, body } = await liveblocks.identifyUser(
          {
            userId: userId,
            groupIds,
          },
          { userInfo: { name: userId } },
        );

        return new Response(body, { status });
      },
    },
  },
});
