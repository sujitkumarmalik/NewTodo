import React from 'react';

function AddTodo({ newTodo, setNewTodo, addTodo }) {
  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo} className="add">Add</button>
    </div>
  );
}

export default AddTodo;
