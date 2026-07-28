import {
  pgTable,
  uuid,
  text,
  integer,
  jsonb,
  timestamp,
  index,
} from 'drizzle-orm/pg-core'
import { workflows } from './workflows'

export const workflowNodes = pgTable(
  'workflow_nodes',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    workflowId: uuid('workflow_id')
      .notNull()
      .references(() => workflows.id, { onDelete: 'cascade' }),
    type: text('type', { enum: ['trigger', 'action'] }).notNull(),
    label: text('label').notNull(),
    positionX: integer('position_x').default(0).notNull(),
    positionY: integer('position_y').default(0).notNull(),
    config: jsonb('config').default({}).notNull(),
    sortOrder: integer('sort_order').default(0).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('nodes_workflow_idx').on(table.workflowId),
  ],
)
