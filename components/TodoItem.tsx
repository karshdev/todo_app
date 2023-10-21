import React from 'react';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => (
  <li className="flex items-center justify-between p-4">
    <span className={`text-lg ${todo.completed ? 'line-through' : ''}`}>
      {todo.text}
    </span>
    <input type="checkbox" checked={todo.completed} />
  </li>
);

export default TodoItem;