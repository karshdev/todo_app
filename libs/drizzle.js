import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import {
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { varchar } from 'drizzle-orm/mysql-core';
 
// Use this object to send drizzle queries to your DB
export const db = drizzle(sql);
// Create a pgTable that maps to a table in your DB
export const ExampleTable = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    name: varchar('name',{length:256}).notNull(),
    email: varchar('email',{length:256}).notNull(),
   
  }
);