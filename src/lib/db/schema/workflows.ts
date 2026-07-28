import { pgTable, uuid, text, timestamp, index } from 'drizzle-orm/pg-core'

export const workflows = pgTable(
  'workflows',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    organizationId: text('organization_id').notNull(),
    createdById: text('created_by_id'),
    status: text('status', { enum: ['draft', 'active', 'archived'] })
      .default('draft')
      .notNull(),
    color: text('color'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [index('workflows_org_idx').on(table.organizationId)],
)
