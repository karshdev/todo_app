// TodoList.js
import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, setTodos }) => {
  const handleDelete = async (deletedItemId) => {
    try {
      const response = await fetch(`api/todo/${deletedItemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Directly remove the deleted item from the array
        const updatedTodos = todos.filter((todo) => todo._id !== deletedItemId);
        // Set the modified array
        setTodos(updatedTodos);
      } else {
        console.error('Error deleting todo:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <ul className="divide-y divide-gray-300 w-full max-w-md">
      {todos && todos?.length > 0 ? (
        todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} onDelete={() => handleDelete(todo._id)} />
        ))
      ) : (
        <p className="text-gray-500 text-center py-4">No todos found.</p>
      )}
    </ul>
  );
};

export default TodoList;
