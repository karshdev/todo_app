"use client"
import React, { useState } from 'react';
import TodoList from '../components/TodoList'
import AddTodoForm from '../components/AddTodoForm';
import Category from '../components/Category'


const Home = () => {

 
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 text-center">TODO APP</h1>
      <AddTodoForm />
       <Category />
    </div>
  );
};

export default Home