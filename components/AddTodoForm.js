"use client"
import React, { useState } from 'react';



const AddTodoForm = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [select, setSelect] = useState('Home');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 w-[100%] flex items-center justify-center flex-col gap-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
        className="p-2 border border-gray-300 w-[50%] "
      />

<select className='p-2 border border-gray-300 w-[50%] '>
  <option value="gym">GYM</option>
  <option value="routine">Routine</option>
  <option value="home">Home</option>
  <option value="office">Office</option>
</select>
      
      <button type="submit" className="ml-2 p-2 bg-blue-500 text-white">
        Add
      </button>
    </form>
  );
};

export default AddTodoForm;