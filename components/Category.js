"use client"
import React, { useContext, useState } from 'react';
import TodoList from './TodoList';
import { StateContext } from '../context/contextapi';
import { FaTrash } from 'react-icons/fa';

const Category = () => {
  const [select, setSelect] = useState('');
  const [btn,setBtn]=useState('')
  const [todos, setTodos] = useState([]);
  const{arr}=useContext(StateContext)
   
  const handleChange = async (e) => {
    const selectedCategory = e.target.value;
    setSelect(selectedCategory);
    setBtn((prevBtn) => (prevBtn === selectedCategory ? '' : selectedCategory));
  
    if (selectedCategory) {
      try {
        const response = await fetch(`/api/category/${selectedCategory}`);
        const data = await response.json();
  
        if (data.length >= 1) {
          setTodos(data);
        } else {
          setTodos([]);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
        setTodos([]);
      }
    }
  };
  const handleDelete=async()=>{
    try {
      const response = await fetch(`api/category?name=${select}`,{
        method:"DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        window.location.reload()   
      } else {
        console.error('Error deleting:');
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
    }

  return (
    <div className='flex flex-col gap-3 items-center justify-center'>
    <div className='flex items-center justify-center gap-3'>
    <button className="group relative p-3 bg-blue-50 max-w-max">
  {select ? select : "Select category of todo"}
  {select && (
    <FaTrash className="text-red-500 transition hover:scale-110 absolute right-0 opacity-0 group-hover:opacity-100" onClick={handleDelete}/>
  )}
  </button>
      <select value={select} onChange={handleChange}>
      <option value="" disabled selected>Your Categories</option>
       {arr.length>=1 && arr?.map((category)=>(
        <option value={category} key={category}>{category}</option>
       ))}
      </select>
      </div>
       {btn && <TodoList todos={todos} />} 

    </div>
  );
};

export default Category;
