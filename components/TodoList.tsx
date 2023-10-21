import TodoItem from './TodoItem';

const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => (
  <ul className="divide-y divide-gray-300">
    {todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </ul>
);

export default TodoList;