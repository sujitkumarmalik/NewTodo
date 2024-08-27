import React from 'react';

function TodoItem({ todo, index, toggleDone, startEdit, deleteTodo, markAsDone, editIndex, editText, setEditText, saveEdit, handleDragStart, handleDrop, handleDragOver }) {
  return (
    <li
      draggable
      onDragStart={(e) => handleDragStart(e, index)}
      onDrop={(e) => handleDrop(e, index)}
      onDragOver={handleDragOver}
      className={todo.done ? 'done' : ''}
    >
      {editIndex === index ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
        />
      ) : (
        <>
          <span onClick={() => toggleDone(index)}>{todo.text}</span>
          <button className="icon-button" onClick={() => startEdit(index)}>
            { <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 3.5l4 4-1.5 1.5-4-4L16 3.5zM2 17v4h4l10.5-10.5L6.5 6 2 17z"></path>
                  </svg>}
          </button>
          <button className="icon-button" onClick={() => deleteTodo(index)}>
            {                <svg viewBox="0 0 24 24"><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1z"></path></svg>
                  }
          </button>
          {!todo.done && (
            <button className="icon-button" onClick={() => markAsDone(index)}>
              { <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6l-12 12-5-5"></path>
                    </svg>}
  
            </button>
          )}
        </>
      )}
    </li>
  );
}

export default TodoItem;
