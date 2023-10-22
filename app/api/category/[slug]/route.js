import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Todo from "../../../../models/Todo";

export async function GET(req,{params}){
    await connectMongoDB()
    try{
     const findbyCat=await Todo.find({
        category:params.slug
     })
     console.log("findByCat",findbyCat);
if(findbyCat.length>=1){
    return NextResponse.json(findbyCat,{status:200})
}
return NextResponse.json({message:"error"},{status:401})
    }catch(err){
        return NextResponse.json({message:"error"},{status:500})
    }
}