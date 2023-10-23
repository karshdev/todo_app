"use client"
import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, select,setTodos, completedTodos, setCompletedTodos }) => {
  const handleDelete = async (deletedItemId) => {
    try {
      const response = await fetch(`api/todo/${deletedItemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedTodos = todos.filter((todo) => todo._id !== deletedItemId);
        setTodos(updatedTodos);

        const updatedCompletedTodos = completedTodos.filter((todo) => todo._id !== deletedItemId);
        setCompletedTodos(updatedCompletedTodos);
      } else {
        console.error('Error deleting todo:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleCheck = async (checkedTodo) => {
 try{
const response=await fetch(`/api/todo/${checkedTodo._id}`,{
  method:"PUT",
  headers: {
    'Content-Type': 'application/json',
  },
})
const res=await response.json()
if(res.message==="Value Set"){
  setCompletedTodos((prev) => [...prev, checkedTodo]);
  setTodos((prev) => prev.filter((todo) => todo._id !== checkedTodo._id));
  return true
}else{
  return false
}
 }catch(err){
  console.log(err);
 }
   
  };

  const handleUncheck = async (uncheckedTodo) => {
    try{
      const response=await fetch(`/api/todo/${uncheckedTodo._id}`,{
        method:"PUT",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const res=await response.json()
      if(res.message==="Value Set"){
        setTodos((prev) => [...prev, uncheckedTodo]);
        setCompletedTodos((prev) => prev.filter((todo) => todo._id !== uncheckedTodo._id));
        return true
      }else{
        return false
      }
       }catch(err){
        console.log(err);
       }
         

  };

  return (
    <>
   {select &&
    (
      <div className='w-[100%]'>
     
      {todos && 
      (
        <>
      <h2 className='text-center'>Incomplete Todos</h2>
      <ul className="  w-[100%]">
        {todos && todos?.length > 0 ? (
          todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onDelete={() => handleDelete(todo._id)}
              onToggle={() => handleCheck(todo)}
              isChecked={false}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No Incomplete todos found.</p>
        )}
      </ul>
      </>
      )
      }
        
      


     
     { completedTodos && 
     (
      <>
     <h2 className='text-center'>Completed Todos</h2>
      <ul className=" w-[100%] ">
        {completedTodos && completedTodos?.length > 0 ? (
          completedTodos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onDelete={() => handleDelete(todo._id)}
              onToggle={() => handleUncheck(todo)}
              isChecked={true}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No completed todos found.</p>
        )}
      </ul>
      </>
  )
      }
    </div>
    )}
    </>
  );
};

export default TodoList;
