import { NextResponse } from "next/server";
import connectmongoDB from '../../../libs/mongodb'
import Category  from "../../../models/category.js";
export async function POST(req) {
  await connectmongoDB()
  const {name}=await req.json()

  try{
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
    const deleteTodo=await Category.findOneAndDelete({name})

    return NextResponse.json({ message: "deleted" }, { status: 200 })
    }catch(err){
        return NextResponse.json({message:"Error"},{status:500})
    }
}
  

