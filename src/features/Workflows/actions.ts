import { auth } from '@clerk/tanstack-react-start/server'
import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { createWorkflow, listWorkflows } from './data'

export const createWorkflowAction = createServerFn({ method: 'POST' })
  .validator(z.object({ name: z.string() }))
  .handler(async ({ data }) => {
    const { orgId } = await auth()
    if (!orgId) throw redirect({ to: '/choose-organization' })
    const workflow = await createWorkflow(orgId, data.name)
    throw redirect({ to: '/workflows/$id', params: { id: workflow.id } })
  })

export const listWorkflowsServerFn = createServerFn({ method: 'GET' })
  .validator(z.object({ orgId: z.string() }))
  .handler(async ({ data }) => {
    return await listWorkflows(data.orgId)
  })
