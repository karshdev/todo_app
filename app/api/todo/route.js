import { NextResponse } from 'next/server';
import {db,todo} from '@/lib/drizzle'




//GET
export async function GET(request) {
    return NextResponse.json("hello")
 
}

 //POST
 export async function POST(request) {
  console.log("request",request);
  try {
    const { data, cat } = await request.json();
    console.log(data, cat);
    const newTodo = {
      taskname: data,
      isDone: false,
      category_name: cat, //  cat is the category name
    };
    // Insert the new todo into the database
    const insertResult = await db
      .insert(todo)
      .values(newTodo)
      .returning();

    console.log("insertResult", insertResult);
    if (insertResult.length > 0) {
      return NextResponse.json({ message: "Success", data: insertResult[0] });
    } else {
      return NextResponse.json({ message: "Error inserting todo" });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error" });
  }
}

