import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Todo from "../../../../models/todo.js";


export async function DELETE(req,{params}){

    await connectMongoDB()
    try{
    const deleteTodo=await Todo.findByIdAndDelete({_id:params.id})
    return NextResponse.json({ message: "deleted" }, { status: 200 })
    }catch(err){
        return NextResponse.json({message:"Error"},{status:500})
    }
}