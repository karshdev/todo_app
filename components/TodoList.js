
import TodoItem from './TodoItem';



const TodoList =({ todos }) => {
return(
  <ul className="divide-y divide-gray-300 w-[100%]">
  {todos && todos?.map((todo) => (
    <TodoItem key={todo._id} todo={todo} />
  ))}
</ul>
);
    }

export default TodoList;