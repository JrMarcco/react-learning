import logo from './logo.svg';
import './App.css';
import React, {useEffect, useRef, useState} from "react";

const KanbanBoard = ({ children }) => (
  <main className="kanban-board">{children}</main>
);

const KanbanColumn = ({ children, className, title }) => {
  const combinedClassName = `kanban-column ${className}`;
  return (
    <section className={combinedClassName}>
      <h2>{title}</h2>
      <ul>{children}</ul>
    </section>
  );
};

const MINUTE = 60 * 1000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const UPDATE_INTERVAL = MINUTE
const KanbanCard = ({ title, status }) => {
  const [displayTime, setDisplayTime] = useState(status);
  useEffect(() => {

    const updateDisplayTime = () => {
      const passedTime = new Date() - new Date(status);
      let relativeTime = 'Just'

      if (MINUTE <= passedTime && passedTime < HOUR) {
        relativeTime = `${Math.ceil(passedTime / MINUTE)} minutes ago`;
      } else if (HOUR <= passedTime && passedTime < DAY) {
        relativeTime = `${Math.ceil(passedTime / HOUR)} hours ago`;
      } else if (passedTime >= DAY) {
        relativeTime = `${Math.ceil(passedTime / DAY)} days ago`;
      }

      setDisplayTime(relativeTime);
    };

    const intervalId = setInterval(updateDisplayTime, UPDATE_INTERVAL);
    updateDisplayTime();

    return function () {
      clearInterval(intervalId)
    }

  }, [status]);

  return (
    <li className="kanban-card">
      <div className="card-title">{title}</div>
      <div className="card-status" title={status}>{displayTime}</div>
    </li>
  );
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

  const inputElem = useRef(null);
  useEffect(() => {
    inputElem.current.focus();
  });

  return (
    <li className="kanban-card">
      <h3>New Card</h3>
      <div className="kanban-card">
        <input type="text" value={title} onChange={handleChange} onKeyDown={handleKeyDown} ref={inputElem}/>
      </div>
    </li>
  );
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
      { title, status: new Date().toLocaleString() },
      ...currentTodoList
    ]);

    setShowAdd(false);
  };

  const todoTitle = (
    <>
      <span>Todo</span>
      <button onClick={handleAdd} disabled={showAdd}>&#8853; 添加新卡片</button>
    </>
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Learning</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <KanbanBoard>
        <KanbanColumn className="column-todo" title={todoTitle}>
          { showAdd && <KanbanNewCard onSubmit={handleSubmit}/> }
          { todoList.map(props => <KanbanCard key={props.title} {...props}/>) }
        </KanbanColumn>
        <KanbanColumn className="column-ongoing" title="Ongoing">
          { ongoingList.map(props => <KanbanCard key={props.title} {...props}/>) }
        </KanbanColumn>
        <KanbanColumn className="column-done" title="Done">
          { doneList.map(props => <KanbanCard key={props.title} {...props}/>) }
        </KanbanColumn>
      </KanbanBoard>
    </div>
  );
}

export default App;
