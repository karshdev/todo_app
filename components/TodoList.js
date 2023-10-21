import TodoItem from './TodoItem';

const TodoList = ({ todos }) => (
  <ul className="divide-y divide-gray-300">
    {todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </ul>
);

export default TodoList;