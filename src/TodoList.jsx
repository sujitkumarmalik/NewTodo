// src/TodoList.js
import React, { useState, useEffect } from 'react';
import './TodoList.css';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import SearchTodo from './SearchTodo';

function TodoList() {
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todos')) || []);
  const [newTodo, setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, done: false }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleDone = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, done: !todo.done } : todo
    );
    setTodos(newTodos);
  };

  const markAsDone = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, done: true } : todo
    );
    setTodos(newTodos);
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditText(todos[index].text);
  };

  const saveEdit = () => {
    const newTodos = todos.map((todo, i) =>
      i === editIndex ? { ...todo, text: editText } : todo
    );
    setTodos(newTodos);
    setEditIndex(null);
    setEditText('');
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const fromIndex = e.dataTransfer.getData('text/plain');
    const todoList = [...todos];
    const [movedTodo] = todoList.splice(fromIndex, 1);
    todoList.splice(index, 0, movedTodo);
    setTodos(todoList);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="todo-list">
      <AddTodo newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} />
      <SearchTodo searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ul>
        {filteredTodos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            index={index}
            toggleDone={toggleDone}
            startEdit={startEdit}
            deleteTodo={deleteTodo}
            markAsDone={markAsDone}
            editIndex={editIndex}
            editText={editText}
            setEditText={setEditText}
            saveEdit={saveEdit}
            handleDragStart={handleDragStart}
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
