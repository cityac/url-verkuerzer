import { randomUUID } from 'crypto'
import { relations, sql } from 'drizzle-orm'
import { sqliteTable, text, unique } from 'drizzle-orm/sqlite-core'

const id = () =>
  text('id')
    .primaryKey()
    .$default(() => randomUUID())

const createdAt = () =>
  text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()


export const users = sqliteTable('users', {
  id: id(),
  createdAt: createdAt(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  links: many(links),
}))

export const links = sqliteTable(
  'links',
  {
    id: id(),
    createdAt: createdAt(),
    longUrl: text('longUrl').notNull(),
    shortHash: text('shortHash').notNull(),
    description: text('description'),
    createdById: text('createdById').notNull(),
  },
  (table) => ({
    unq: unique().on(table.createdById, table.shortHash),
  })
)

export const linksRelations = relations(links, ({ one }) => ({
  createdBy: one(users, {
    references: [users.id],
    fields: [links.createdById],
  }),
}))

