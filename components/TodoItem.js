import React from 'react';
import {FaTrash} from 'react-icons/fa'

const TodoItem = ({ todo}) => {
  const handleDelete=async()=>{
    try {
      const response = await fetch(`api/todo/${todo._id}`,{
        method:"DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: todo._id }),
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
  <li className="group/item  p-1 font-medium text-[15px] rounded-[10px] hover:bg-blue-50 cursor-pointer justify-center flex fow gap-2 items-center">
    <span className='text-lg'>
      {todo.taskname}
    </span>
    <FaTrash className='text-blue-500 transition hover:scale-110' onClick={handleDelete}/>
  </li>
);
}

export default TodoItem;