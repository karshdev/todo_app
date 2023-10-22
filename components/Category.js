"use client"
import React, { useState } from 'react';
import TodoList from './TodoList';

const Category = () => {
  const [btn, setBtn] = useState('');
  const [todos, setTodos] = useState([]);

  const handleBtnClick = async (category) => {
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
      <button onClick={() => handleBtnClick('GYM')}>
        GYM
      </button>
      <button onClick={() => handleBtnClick('Office')}>
        Office
      </button>
      <button onClick={() => handleBtnClick('Routine')}>
        Routine
      </button>
      <button onClick={() => handleBtnClick('Home')}>
        Home
      </button>
      </div>
      {btn && <TodoList todos={todos} />}

    </div>
  );
};

export default Category;
