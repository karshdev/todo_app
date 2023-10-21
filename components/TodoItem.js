import React from 'react';


const TodoItem = ({ todo }) => (
  <li className="flex items-center justify-between p-4">
    <span className={`text-lg ${todo.completed ? 'line-through' : ''}`}>
      {todo.text}
    </span>
    <input type="checkbox" checked={todo.completed} />
  </li>
);

export default TodoItem;