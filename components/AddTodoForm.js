import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../context/contextapi';

const AddTodoForm = () => {
  const { arr, setArr } = useContext(StateContext);
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [select, setSelect] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddCategory = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: category.toUpperCase() }),
      });
      const res = await response.json();
      if (res.message === 'added') {
        setArr((prev) => [...prev, res.addCategory.name]);
        setCategory('');
      } else if (res.message === 'exists') {
        console.log('Already exists');
        setCategory('');
      } else {
        setCategory('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getAllCat = async () => {
    try {
      const response = await fetch(`/api/category`);
      const res = await response.json();

      if (res.length >= 1) {
        setArr(res);
        setCategory('');
      } else {
        // Handle no categories
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllCat();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text) {
      return false;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskname: text, cat: select }),
      });

      const res = await response.json();
      if (res.message === 'added') {
        window.location.reload();
      } else {
        // Handle other cases
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center  bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">TODO App</h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new todo..."
            className="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />

          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Add a new category"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500"
          />

          <button
            type="button"
            onClick={handleAddCategory}
            className={`p-3 bg-green-500 text-white rounded hover:bg-green-600 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Adding category...' : 'Add category'}
          </button>

          <select
            className="p-3 border border-gray-300 rounded"
            value={select}
            onChange={(e) => setSelect(e.target.value)}
          >
            <option value="" disabled>
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
            className={`p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTodoForm;
