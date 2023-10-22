import {
    pgTable,
    serial,
    
  } from 'drizzle-orm/pg-core';
  import { boolean, varchar } from 'drizzle-orm/mysql-core';
  import { relations } from 'drizzle-orm';

export const category = pgTable(
    'category',
    {  
      id: serial('id'),
      catname: varchar('catname',{length:256}).primaryKey(),
    }
  );
  export const todo = pgTable(
    'todo',
    {
      id: serial('id').primaryKey(),
      taskname: varchar('taskname',{length:256}).notNull(),
      isDone: boolean('isDone'),
      category_name: varchar('category_name',{length:256}).references(category.catname) 
    }
  );
  export const CategoryRelations = relations(category, ({many }) => ({
    todos: many(todo, {
      fields: [category.catname],
      references: [todo.category_name],
    }),
  }));
  