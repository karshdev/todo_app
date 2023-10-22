"use client"
import React, { useState } from 'react';
import TodoList from './TodoList';
import { todo } from 'node:test';



const AddTodoForm = () => {
  const [text, setText] = useState('');
  const [select, setSelect] = useState('Home');
  const[todos,setTodos]=useState([])

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
      console.log("Res",res);
      if(res){
       setTodos(res)
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
  <option value="gym">GYM</option>
  <option value="routine">Routine</option>
  <option value="home">Home</option>
  <option value="office">Office</option>
</select>
      
      <button type="submit" className="ml-2 p-2 bg-blue-500 text-white">
        Add
      </button>
    </form>
   {todos &&  <TodoList todos={todos} />}
    </>
  );
};

export default AddTodoForm;