import axios from "axios";
import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

/* todos = [

      {
        id: 34324,
        text: 'todo1'
      },
      {
        id: 343244324,
        text: 'todo2'
      },
    ]
    */

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(0);

  const addTodo = async (todo) => {
    console.log(todo);
    let res1 = await axios.post("http://localhost:8080/api/todo", {
      id: todo.id,
      todo: todo.text,
      is_complete: todo.isComplete,
    });
    fetchTodos();
    // setTodos(todos);
  };

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:8080/api/todo");
    setTodos(
      res.data.map((todo) => ({
        id: todo.id,
        text: todo.todo,
        isComplete: todo.is_complete,
      }))
    );
    console.log(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // const addTodo = (todo) => {
  //   //if no one types a letter it doesnt showup
  //   if (!todo.text || /^\s*$/.test(todo.text)) {
  //     return;
  //   }

  //   // const newTodos = [todo, ...todos];
  //   // const newArr = [...todos];
  //   const newArr = [];
  //   for (let i = 0; i < todos.length; i++) {
  //     newArr.push(todos[i]);
  //   }
  //   newArr.push(todo);

  //   setTodos(newArr);
  //   // setCount((prev) => prev + 1);
  //   // console.log(...todos);
  // };

  const removeTodo = (id) => {
    // const removeArr = [...todos].filter((todo) => todo.id !== id);
    const newArr = [];
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id != id) {
        newArr.push(todos[i]);
      }
    }

    setTodos(newArr);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    const newArr = [];
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id == todoId) {
        newArr.push(newValue);
      } else {
        newArr.push(todos[i]);
      }
    }
    setTodos(newArr);

    // setTodos((prev) =>
    //   prev.map((item) => (item.id === todoId ? newValue : item))
    // );
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Whats the plan for today?</h1>
      <h3>{count}</h3>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}
export default TodoList;
