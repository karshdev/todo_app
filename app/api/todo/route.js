
import { NextResponse } from 'next/server';
 import {db,todo} from '@/lib/drizzle'
export async function GET(request) {
    return NextResponse.json("hello")
 
}

 
export async function POST(request) {
  const {data}=await request.json()
 
  const newTodo={
  taskname:data,
  isDone:false
  }
const insertDb=await db.insert(todo).values(newTodo).returning()
console.log("insertDb",insertDb);
    return NextResponse.json({message:"Success"})
 
}