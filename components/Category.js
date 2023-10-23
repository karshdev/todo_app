"use client"
import React, { useContext, useState } from 'react';
import TodoList from './TodoList';
import { StateContext } from '../context/contextapi';
import { FaTrash } from 'react-icons/fa';
import { AiOutlineArrowRight } from 'react-icons/ai';

const Category = () => {
  const [select, setSelect] = useState('');
  const [todos, setTodos] = useState([]);
  const { arr } = useContext(StateContext);

  const handleChange = async (e) => {
    const selectedCategory = e.target.value;
    setSelect(selectedCategory);

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

  const handleDelete = async () => {
    try {
      const response = await fetch(`api/category?name=${select}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        window.location.reload();
      } else {
        console.error('Error deleting:');
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center justify-center p-4">
      <div className="flex items-center justify-center gap-4 w-full">
      <button
  className="relative flex items-center justify-center group p-4 bg-blue-500 text-white w-full max-w-md hover:shadow-lg transition duration-300 ease-in-out transform hover:translate-x-1"
  disabled={!select}
>
  <FaTrash
    className={`text-red-500 ${select ? 'opacity-100' : 'opacity-0'} group-hover:scale-110 transition duration-300 ease-in-out mr-2`}
    onClick={handleDelete}
  />
  <span className="block flex-1">{select || 'Select todo'}</span>
</button>

        <AiOutlineArrowRight className="h-6 w-6" />
        <select
          value={select}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded w-full max-w-md"
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
      {todos.length > 0 && <TodoList todos={todos} setTodos={setTodos}/>}
    </div>
  );
};

export default Category;
