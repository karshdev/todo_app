"use client"
import React, { useContext, useState } from 'react';
import TodoList from './TodoList';
import { StateContext } from '../context/contextapi';

const Category = () => {
  const [select, setSelect] = useState('');
  const [todos, setTodos] = useState([]);
  const{arr}=useContext(StateContext)
   
  const handleChange = async (e,category) => {
    setSelect((e)=>e.target.value)
    setBtn((prevBtn) => (prevBtn === category ? '' : category));

    if (category) {
      const response = await fetch(`/api/category/${category}`)
      const res=await response.json()
      if (res.length>=1) {
        setTodos(res);
      } else {
        setTodos('');
      }
    }
  };

  return (
    <div className='flex flex-col gap-3 items-center justify-center'>
    <div className='flex items-center justify-center gap-3'>
      Select categroy of todo 
      <select value={select} onChange={(e)=>handleChange(e,select)}>
      <option value="" disabled selected>Your Categories</option>
       {arr.length>=1 && arr?.map((category)=>(
        <option value={category} key={category}>{category}</option>
       ))}
      </select>
      </div>
       {select && <TodoList todos={todos} />} 

    </div>
  );
};

export default Category;
