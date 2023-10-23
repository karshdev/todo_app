import { NextResponse } from "next/server";
import connectmongoDB from '../../../libs/mongodb'
import Todo  from "../../../models/todo.js";
export async function POST(req) {
  await connectmongoDB()
  const {taskname,cat}=await req.json()
  try{
const addTodo=await Todo.create({
  taskname:taskname,
  category:cat,
})
if(addTodo){
  return NextResponse.json({message:"added"},{status:200})
}
return NextResponse.json({message:"failed"},{status:401})
  }catch(err){
 
    return NextResponse.json({message:"error"},{status:200})
  }
}


