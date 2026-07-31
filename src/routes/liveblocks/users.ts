import { createFileRoute } from '@tanstack/react-router';
import { auth, clerkClient } from '@clerk/tanstack-react-start/server';

export const Route = createFileRoute('/liveblocks/users')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { userId, orgId } = await auth();

        if (!userId || !orgId)
          return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
          });

        const body = (await request.json()) as { userIds?: string[] };
        const userIds = body.userIds;

        if (!Array.isArray(userIds) || userIds.length === 0)
          return new Response(
            JSON.stringify({ error: 'userIds must be a non-empty array' }),
            { status: 400 },
          );

        const { data: users } = await clerkClient().users.getUserList({
          userId: userIds,
        });

        const usersById = new Map(users.map((user) => [user.id, user]));

        const result = userIds.map((id) => {
          const user = usersById.get(id);
          if (!user) return null;

          const name = [user.firstName, user.lastName]
            .filter(Boolean)
            .join(' ');

          return {
            name:
              name ||
              user.username ||
              user.emailAddresses[0]?.emailAddress ||
              id,
            avatar: user.imageUrl,
          };
        });

        return new Response(JSON.stringify(result), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      },
    },
  },
});
