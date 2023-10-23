"use client"
import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../context/contextapi';




const AddTodoForm = () => {
  const { arr, setArr } = useContext(StateContext)
  const [text, setText] = useState('');
  const [category, setCategory] = useState('')
  const [select, setSelect] = useState('');


  const handleAddCategory = async () => {
    try {
      const response = await fetch(`/api/category`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: category.toUpperCase() })
      })
      const res = await response.json()
      if (res.message === "added") {
        setArr((prev) => [
          ...prev,
          res.addCategory.name
        ])
        setCategory('');
      } else if (res.message === "exists") {
        console.log("Already exists")
        setCategory('');
      } else {
        setCategory('');
      }
    } catch (err) {

    }
  }

  const getAllCat = async () => {
    try {
      const response = await fetch(`/api/category`)
      const res = await response.json()

      if (res.length >= 1) {
        setArr(res)

        setCategory('');
      } else {

      }
    } catch (err) {

    }
  }

  useEffect(() => {
    getAllCat()
  }, [])

  const handleSubmit = async (e) => {
    if (!text) {
      return false;
    }
    const response = await fetch(`/api/todo`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskname: text, cat: select })
    })

    const res = await response.json()
    if (res.message === "added") {
      window.location.reload()
    } else {

    }
  };

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-4 w-full max-w-lg mx-auto flex items-center justify-center flex-col gap-4"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="p-3 border border-gray-300 w-full rounded"
        />
        <div className="flex items-center w-[100%] justify-between gap-4">
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Add a new category"
            className="p-3 border border-gray-300  rounded w-[60%]"
          />
          <button
            type="button"
            onClick={handleAddCategory}
            className="p-3 bg-green-500 text-white rounded w-[40%]"
          >
            Add category
          </button>
        </div>

        <select
          className="p-3 border border-gray-300 w-full rounded"
          value={select}
          onChange={(e) => setSelect(e.target.value)}
        >
          <option value="" disabled selected>
            Your Categories
          </option>
          {arr.length >= 1 &&
            arr?.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>

        <button
          type="button"
          onClick={handleSubmit}
          className="p-3 bg-blue-500 text-white rounded w-[50%]"
        >
          Add
        </button>
      </form>
    </>
  );
};

export default AddTodoForm;