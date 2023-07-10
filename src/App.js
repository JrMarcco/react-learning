import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";

const KanbanCard = ({ title, status }) => {
  return (
    <li className="kanban-card">
      <div className="card-title">{title}</div>
      <div className="card-status">{status}</div>
    </li>
  )
}

const KanbanNewCard = ({ onSubmit }) => {
  const [title, setTitle] = useState('');

  const handleChange = (evt) => {
    setTitle(evt.target.value)
  };

  const handleKeyDown = (evt) => {
    if (evt.key === 'Enter') {
      onSubmit(title)
    }
  };

  return (
    <li className="kanban-card">
      <h3>添加新卡片</h3>
      <div className="kanban-card">
        <input type="text" value={title} onChange={handleChange} onKeyDown={handleKeyDown}/>
      </div>
    </li>
  )
}

function App() {
  const [showAdd, setShowAdd] = useState(false);

  const [todoList, setTodoList] = useState([]);

  const [ongoingList, setOngoingList] = useState([]);
  const [doneList, setDoneList] = useState([]);

  const handleAdd = (evt) => {
    setShowAdd(true);
  };

  const handleSubmit = (title) => {

    setTodoList(currentTodoList => [
      { title, status: new Date().toDateString() },
      ...currentTodoList
    ]);

    setShowAdd(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Learning</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className="kanban-board">
        <section className="kanban-column column-todo">
          <h2>待处理<button onClick={handleAdd} disabled={showAdd}>&#8853; 添加新卡片</button></h2>
          <ul>
            { showAdd && <KanbanNewCard onSubmit={handleSubmit}/> }
            { todoList.map(props => <KanbanCard {...props}/>) }
          </ul>
        </section>
        <section className="kanban-column column-ongoing">
          <h2>进行中</h2>
          <ul>
            { ongoingList.map(props => <KanbanCard {...props}/>) }
          </ul>
        </section>
        <section className="kanban-column column-done">
          <h2>已完成</h2>
          <ul>
            { doneList.map(props => <KanbanCard {...props}/>) }
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
