
import React from 'react';

function SearchTodo({ searchTerm, setSearchTerm }) {
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search todos"
      />
    </div>
  );
}

export default SearchTodo;
