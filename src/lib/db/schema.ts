import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

const defaultId = () => crypto.randomUUID();

const defaultNow = () => new Date();

export const earlyAccessTable = sqliteTable('early_access', {
  id: text('id').primaryKey().unique().$defaultFn(defaultId),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  approved: integer('approved', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .notNull()
    .$defaultFn(defaultNow),
  invitationSentAt: integer('invitation_sent_at', { mode: 'timestamp_ms' }),
});
