import { NextResponse } from "next/server";
import connectmongoDB from '../../../libs/mongodb'
import Category  from "../../../models/category.js";
import Todo from "../../../models/todo.js";
export async function POST(req) {
  await connectmongoDB()
  const {name}=await req.json()

  try{
    if(name){
        const findCat=await Category.find({
            name
        })
        if(findCat.length>=1){
            return NextResponse.json({message:"exists"},{status:200})
        }
    }
const addCategory=await Category.create({
  name
})
if(addCategory){
  return NextResponse.json({message:"added",addCategory},{status:200})
}
return NextResponse.json({message:"failed"},{status:401})
  }catch(err){
 
    return NextResponse.json({message:"error"},{status:200})
  }
}
export async function GET(req) {
    await connectmongoDB()
    try{
  const findCat=await Category.find({})
  const categoryNames = findCat.map((category) => category.name);
  if(findCat.length>=1){
    return NextResponse.json(categoryNames,{status:200})
  }
  return NextResponse.json({message:"failed"},{status:401})
    }catch(err){
      
      return NextResponse.json({message:"error"},{status:200})
    }
  }
  export async function DELETE(req){
    const {searchParams}=new URL(req.url)
    const name=searchParams.get("name")
    await connectmongoDB()
    try{
    const deleteCat=await Category.findOneAndDelete({name})
    const deleteTodo=await Todo.deleteMany({category:name})

    return NextResponse.json({ message: "deleted" }, { status: 200 })
    }catch(err){
        return NextResponse.json({message:"Error"},{status:500})
    }
}
  


