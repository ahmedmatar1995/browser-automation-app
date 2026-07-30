import { auth as clerkAuth } from '@clerk/tanstack-react-start/server';
import { redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { auth, tasks } from '@trigger.dev/sdk';
import { z } from 'zod';
import type { helloWorldTask } from '@/trigger/example';
import { createWorkflow, listWorkflows } from './data';

export const createWorkflowAction = createServerFn({ method: 'POST' })
  .validator(z.object({ name: z.string() }))
  .handler(async ({ data }) => {
    const { orgId } = await clerkAuth();
    if (!orgId) throw redirect({ to: '/choose-organization' });
    const workflow = await createWorkflow(orgId, data.name);
    throw redirect({ to: '/workflows/$id', params: { id: workflow.id } });
  });

export const listWorkflowsServerFn = createServerFn({ method: 'GET' })
  .validator(z.object({ orgId: z.string() }))
  .handler(async ({ data }) => {
    return await listWorkflows(data.orgId);
  });

export const runWorkflowAction = createServerFn({ method: 'POST' }).handler(
  async () => {
    const { orgId } = await clerkAuth();
    if (!orgId) throw redirect({ to: '/choose-organization' });
    const handle = await tasks.trigger<typeof helloWorldTask>('hello-world', {
      message: `Workflow run triggered by org ${orgId}`,
    });
    return { id: handle.id, publicAccessToken: handle.publicAccessToken };
  },
);

export const getTriggerTokenAction = createServerFn({ method: 'POST' }).handler(
  async () => {
    const { orgId } = await clerkAuth();
    if (!orgId) throw redirect({ to: '/choose-organization' });
    const token = await auth.createTriggerPublicToken('hello-world');
    return { token };
  },
);
