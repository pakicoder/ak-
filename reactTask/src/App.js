import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import Filter from './components/Filter';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

 
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    } else {
      fetchInitialTodos();
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const fetchInitialTodos = async () => {
    try {
      const response = await fetch('https://dummyjson.com/todos?limit=10');
      const data = await response.json();
      const formattedTodos = data.todos.map(todo => ({
        id: todo.id,
        text: todo.todo,
        completed: todo.completed
      }));
      setTodos(formattedTodos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'completed':
        return todo.completed;
      case 'pending':
        return !todo.completed;
      default:
        return true;
    }
  });

  return (
    <div className="app">
      <div className="container">
        <h1>React To-Do List</h1>
        <AddTodo onAdd={addTodo} />
        <Filter currentFilter={filter} onFilterChange={setFilter} />
        <TodoList 
          todos={filteredTodos} 
          onToggle={toggleTodo} 
          onDelete={deleteTodo} 
        />
        <div className="stats">
          Total: {todos.length} | Completed: {todos.filter(t => t.completed).length} | Pending: {todos.filter(t => !t.completed).length}
        </div>
      </div>
    </div>
  );
}

export default App;