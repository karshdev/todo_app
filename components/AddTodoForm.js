"use client"
import React, { useState } from 'react';




const AddTodoForm = () => {
  const [text, setText] = useState('');
  const [select, setSelect] = useState('GYM');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <form onSubmit={handleSubmit} className="mt-4 w-[100%] flex items-center justify-center flex-col gap-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
        className="p-2 border border-gray-300 w-[50%] "
      />

<select className='p-2 border border-gray-300 w-[50%]' value={select} onChange={(e)=>setSelect(e.target.value)}>
  <option value="GYM">GYM</option>
  <option value="Routine">Routine</option>
  <option value="Home">Home</option>
  <option value="Office">Office</option>
</select>
      
      <button type="submit" className="ml-2 p-2 bg-blue-500 text-white">
        Add
      </button>
    </form>
    </>
  );
};

export default AddTodoForm;