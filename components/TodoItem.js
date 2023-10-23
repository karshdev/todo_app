"use client"
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const TodoItem = ({ todo, onDelete, onToggle, isChecked }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(`api/todo/${todo._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: todo._id }),
      });
      if (response.ok) {
        onDelete(todo._id);
      } else {
        console.error('Error deleting:');
      }
    } catch (error) {
      console.error('Error deleting:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <li className="group p-4 bg-white rounded-md shadow-md  w-[100%] flex items-center justify-between mb-4 transition duration-300 ease-in-out transform hover:scale-105">
      <span className={`text-lg`}>{todo.taskname}</span>
      <div className='flex items-center justify-center gap-3'>
        <input type="checkbox" checked={isChecked} onChange={onToggle} />
        <FaTrash
          className={`text-red-500 cursor-pointer transition duration-300 ease-in-out ${
            isDeleting ? 'opacity-50' : 'opacity-100 group-hover:scale-110'
          }`}
          onClick={handleDelete}
        />
      </div>
    </li>
  );
};

export default TodoItem;
