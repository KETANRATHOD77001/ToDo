// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [updatedTodo, setUpdatedTodo] = useState({ id: null, text: '' });

  useEffect(() => {
    // Fetch todos on component mount
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.post('http://localhost:8080/todos', {
        text: newTodo,
      });

      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/todos/${updatedTodo.id}`, {
        text: updatedTodo.text,
      });
      setTodos(todos.map((todo) => (todo._id === updatedTodo.id ? response.data : todo)));
      setUpdatedTodo({ id: null, text: '' });
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          placeholder="New todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text}{' '}
            <button onClick={() => setUpdatedTodo({ id: todo._id, text: todo.text })}>
              Update
            </button>{' '}
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
      {updatedTodo.id && (
        <div>
          <input
            type="text"
            placeholder="Update todo"
            value={updatedTodo.text}
            onChange={(e) => setUpdatedTodo({ ...updatedTodo, text: e.target.value })}
          />
          <button onClick={updateTodo}>Update Todo</button>
        </div>
      )}
    </div>
  );
}

export default App;
