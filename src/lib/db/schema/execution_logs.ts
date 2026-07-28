import {
  pgTable,
  uuid,
  text,
  jsonb,
  timestamp,
  index,
} from 'drizzle-orm/pg-core'
import { workflowExecutions } from './executions'

export const executionLogs = pgTable(
  'execution_logs',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    executionId: uuid('execution_id')
      .notNull()
      .references(() => workflowExecutions.id, { onDelete: 'cascade' }),
    nodeId: uuid('node_id').notNull(),
    status: text('status', {
      enum: ['pending', 'running', 'success', 'failed'],
    })
      .default('pending')
      .notNull(),
    input: jsonb('input'),
    output: jsonb('output'),
    error: text('error'),
    startedAt: timestamp('started_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    completedAt: timestamp('completed_at', { withTimezone: true }),
  },
  (table) => [
    index('logs_execution_idx').on(table.executionId),
  ],
)
