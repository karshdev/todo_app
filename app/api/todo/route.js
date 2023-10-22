import { NextResponse } from "next/server";
import connectmongoDB from '../../../libs/mongodb'
import {Todo,Category}  from "../../../models/Todo";
export async function POST(req) {
  await connectmongoDB()
  const {taskname,cat}=await req.json()

  try{
const addTodo=await Todo.create({
  taskname:taskname,
  category:cat,
})
return NextResponse.json(addTodo,{status:200})
  }catch(err){
    console.log(err);
    return NextResponse.json({message:"failed"},{status:200})
  }
}


