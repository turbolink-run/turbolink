import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core';

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

export type EarlyAccess = typeof earlyAccessTable.$inferSelect;
export type NewEarlyAccess = typeof earlyAccessTable.$inferInsert;

export const userTable = sqliteTable('user', {
  id: text('id').primaryKey(),
  name: text('name'),
  image: text('image'),
  email: text('email').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .notNull()
    .$defaultFn(defaultNow),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .notNull()
    .$onUpdateFn(defaultNow),
});

export type User = typeof userTable.$inferSelect;
export type NewUser = typeof userTable.$inferInsert;

export const sessionTable = sqliteTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  expiresAt: integer('expires_at').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .notNull()
    .$defaultFn(defaultNow),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .notNull()
    .$onUpdateFn(defaultNow),
});

export const oauthAccountTable = sqliteTable(
  'oauth_account',
  {
    providerId: text('provider_id').notNull(),
    providerUserId: text('provider_user_id').notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
    createdAt: integer('created_at', { mode: 'timestamp_ms' })
      .notNull()
      .$defaultFn(defaultNow),
    updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
      .notNull()
      .$onUpdateFn(defaultNow),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.providerId, table.providerUserId] }),
  }),
);

export type OAuthAccount = typeof oauthAccountTable.$inferSelect;
export type NewOAuthAccount = typeof oauthAccountTable.$inferInsert;
