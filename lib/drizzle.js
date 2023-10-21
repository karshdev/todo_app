import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import {
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { boolean, varchar } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
 
// Use this object to send drizzle queries to your DB

// Create a pgTable that maps to a table in your DB
export const todo = pgTable(
  'todo',
  {
    id: serial('id').primaryKey(),
    taskname: varchar('taskname',{length:256}).notNull(),
    isDone: boolean('isDone'),
    category_name: varchar('category_name').references(category.catname)
   
  }
);
export const category = pgTable(
  'category',
  {  
    id: serial('id'),
    catname: varchar('catname',{length:256}).primaryKey(),
  }
);
export const CategoryRelations = relations(category, ({many }) => ({
  todos: many(todo, {
    fields: [category.catname],
    references: [todo.category_name],
  }),
}));
export const TodoRelations = relations(todo, ({ one }) => ({
  category: one(category, {
    fields: [todo.category_name],
    references: [category.id],
  }),
}));
export const db = drizzle(sql);