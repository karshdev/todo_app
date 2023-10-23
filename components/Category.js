"use client"
import React, { useContext, useState } from 'react';
import TodoList from './TodoList';
import { StateContext } from '../context/contextapi';
import { FaTrash } from 'react-icons/fa';
import {AiOutlineArrowRight} from 'react-icons/ai'
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
    <div className="flex flex-col gap-6 items-center justify-center p-4">
      <div className="flex items-center justify-center gap-4">
      <button className="relative group p-4 bg-blue-500 text-white max-w-max hover:shadow-lg transition duration-300 ease-in-out transform hover:translate-x-1 hover:w-full flex items-center">
      {select && (
        <>
          <FaTrash
            className="text-red-500 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition duration-300 ease-in-out mr-2"
            onClick={handleDelete}
          />
          <span className="block">{select}</span>
        </>
      )}
      {!select && 'Select category of todo'}
    </button>
    <AiOutlineArrowRight
          />
        <select
          value={select}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded"
        >
          <option value="" disabled selected>
            Your Categories
          </option>
          {arr.length >= 1 &&
            arr?.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
        </select>
      </div>
      {btn && <TodoList todos={todos} />}
    </div>
  );
};

export default Category;
