"use client"
import React, { useState } from 'react';
import TodoList from '@/components/TodoList';
import AddTodoForm from '@/components/AddTodoForm';



const Home = () => {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (text) => {
    const newTodo = {
      id: todos.length + 1,
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 text-center">TODO APP</h1>
      <AddTodoForm onAdd={handleAddTodo} />
      <TodoList todos={todos} />
    </div>
  );
};

export default Home