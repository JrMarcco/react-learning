import React, { useEffect, useRef, useState } from "react";

export default function KanbanNewCard ({ onSubmit }) {
  const [title, setTitle] = useState('');

  const handleChange = (evt) => {
    setTitle(evt.target.value)
  };

  const handleKeyDown = (evt) => {
    if (evt.key === 'Enter') {
      onSubmit(title)
    }
  };

  const inputElem = useRef(null);
  useEffect(() => {
    inputElem.current.focus();
  }, []);

  return (
    <li className="kanban-card">
      <h3>New Card</h3>
      <div className="kanban-card">
        <input type="text" value={title} onChange={handleChange} onKeyDown={handleKeyDown} ref={inputElem}/>
      </div>
    </li>
  );
};