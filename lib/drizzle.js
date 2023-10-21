import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import {
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { boolean, varchar } from 'drizzle-orm/mysql-core';
 
// Use this object to send drizzle queries to your DB

// Create a pgTable that maps to a table in your DB
export const todo = pgTable(
  'todo',
  {
    id: serial('id').primaryKey(),
    taskname: varchar('taskname',{length:256}).notNull(),
    isDone: boolean('isDone')
   
  }
);
export const db = drizzle(sql);