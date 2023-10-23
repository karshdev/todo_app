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
export async function PUT(req,{params}){

    await connectMongoDB()
    console.log(params.id);
    try{
        const existingTodo = await Todo.findById(params.id);
        const existingValueOfCompletedField = existingTodo.completed;
        
        const setTodo = await Todo.findByIdAndUpdate(
          { _id: params.id },
          { $set: { completed: !existingValueOfCompletedField } },
          { new: true }
        );
    return NextResponse.json({ message: "Value Set" }, { status: 200 })
    }catch(err){
        console.log(err);
        return NextResponse.json({message:"Error"},{status:500})
    }
}