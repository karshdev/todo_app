"use client"
import React, { useState } from 'react';




const AddTodoForm = () => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('')
  const[arr,setArr]=useState([])
  const [select, setSelect] = useState('');
  const handleAddCategory=async ()=>{
    try{
const response=await fetch(`/api/category`,{
method:"POST",
headers: {
  'Content-Type': 'application/json',
},
body: JSON.stringify({ name:category})
})
const res=await response.json()
if(res.message==="added"){
  console.log("Result",res);
  setArr((prev)=>[
    ...prev,
    res.addCategory.name
  ])
  setCategory('');
    }else{
      console.log("Someerror");
    }
   
   

  }catch(err){
    console.log("error catch block");
  }
}
console.log(arr);
  const handleSubmit = async (e) => {
    if(!text){
      return false;
    }
      const response=await fetch(`/api/todo`,{
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskname:text,cat:select })
      })
        
      const res=await response.json()
        if(res.message==="added"){
       window.location.reload()
      }else{
         console.log("Some error");
      }
  };

  return (
    <>
    <form onSubmit={e=>e.preventDefault()} className="mt-4 w-[100%] flex items-center justify-center flex-col gap-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
        className="p-2 border border-gray-300 w-[50%] "
      />
      <div className='flex items-center justify-center gap-2'>
       <input
        type="text"
        value={category}
        onChange={(e)=> setCategory(e.target.value)}
        placeholder="Add a new category"
        className="p-2 border border-gray-300 w-[50%] "
      />
      <button type="button" onClick={handleAddCategory}>Add category</button>
      </div>


<select className='p-2 border border-gray-300 w-[50%]' value={select} onChange={(e)=>setSelect(e.target.value)}>
<option value="" disabled selected>Your Categories</option>
{arr.length>=1 && arr?.map((category) => (
    <option key={category} value={category}>
      {category}
    </option>
  ))}
</select>
      
      <button type="button" onClick={handleSubmit} className="ml-2 p-2 bg-blue-500 text-white">
        Add
      </button>
    </form>
    </>
  );
};

export default AddTodoForm;