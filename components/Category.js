import React from 'react'

const getData=async (slug)=>{
    const res=await fetch(`/api/category/${slug}`,{
      cache:"no-store",
    })
   if(!res.ok){
    throw new Error("Failed")
     }
      return res.json()
  }
const Category = async ({slug}) => {
    console.log("Slug",slug);
    const data=await getData(slug)
  return (
    <div>
      {data?.map((val)=>(
        <>
        <li>{val.taskname}</li>
        </>
      ))}
    </div>
  )
}

export default Category
