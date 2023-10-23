"use client"
import React, { useState } from 'react';
import TodoList from '../components/TodoList'
import AddTodoForm from '../components/AddTodoForm';
import Category from '../components/Category'


const Home = () => {

 
  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-md shadow-lg">
    <h1 className="text-4xl font-bold mb-8 text-center text-indigo-600">TODO APP</h1>
    <AddTodoForm />
    <Category />
  </div>
  );
};

export default Home