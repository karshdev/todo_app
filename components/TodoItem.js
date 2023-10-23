// TodoItem.js
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const TodoItem = ({ todo, onDelete }) => {
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
        onDelete(todo._id); // Notify parent component to remove the item from the state
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
    <li className="group p-4 bg-white rounded-md shadow-md flex items-center justify-between mb-4 transition duration-300 ease-in-out transform hover:scale-105">
  <span className="text-lg">{todo.taskname}</span>
  <FaTrash
    className={`text-red-500 cursor-pointer transition duration-300 ease-in-out ${
      isDeleting ? 'opacity-50' : 'opacity-100 group-hover:scale-110'
    }`}
    onClick={handleDelete}
  />
</li>
  );
};

export default TodoItem;
