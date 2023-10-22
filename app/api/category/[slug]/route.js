import { NextResponse } from 'next/server';
import {db,category, CategoryRelations} from '../../../../lib/drizzle'

//GET
export async function GET(request, { params }) {
    const {slug}=params
    try {
      const categoryWithTodos = await db.select(category, {
        where: { catname: slug },
        include: CategoryRelations.todos,
      });
  
      const todos = categoryWithTodos.todos;
  
      return NextResponse.json(todos, { status: 200 });
    } catch (error) {
      console.error('Error fetching todos for category:', error);
      return NextResponse.json({ message: 'error' }, { status: 500 });
    }
  }