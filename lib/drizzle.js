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
    categoryId: serial('category_id').references('category', 'cat')
   
  }
);
export const category = pgTable(
  'category',
  {  
    id: serial('id'),
    cat: varchar('cat',{length:256}).notNull().primaryKey(),
  }
);
export const CategoryRelations = relations(category, ({many }) => ({
  todos: many(todo, {
    fields: [category.cat],
    references: [todo.categoryId],
  }),
}));
export const db = drizzle(sql);