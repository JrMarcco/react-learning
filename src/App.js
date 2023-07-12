import logo from './logo.svg';
import './App.css';
import React, { useEffect, useRef, useState } from "react";
import KanbanBoard from "./kanbanBoard";
import KanbanCard from "./kanbanCard";
import KanbanNewCard from "./kanbanNewCard";
import KanbanColumn from "./kanbanColumn";


const DATA_STORE_KEY = "kanban-data";
const COLUMN_KEY_TODO = "todo";
const COLUMN_KEY_ONGOING = "ongoing";
const COLUMN_KEY_DONE = "done";

function App() {
  const [loading, setLoading] = useState(true);

  const [todoList, setTodoList] = useState([]);
  const [ongoingList, setOngoingList] = useState([]);
  const [doneList, setDoneList] = useState([]);

  useEffect(() => {
    const data = window.localStorage.getItem(DATA_STORE_KEY);
    setTimeout(() => {
      if (data) {
        const kanbanColumnData = JSON.parse(data);
        setTodoList(kanbanColumnData.todoList);
        setOngoingList(kanbanColumnData.ongoingList);
        setDoneList(kanbanColumnData.doneList);
      }

      setLoading(false);

    }, 1000);
  }, []);

  const handleSaveAll = () => {
    const data = JSON.stringify({
      todoList,
      ongoingList,
      doneList
    });

    window.localStorage.setItem(DATA_STORE_KEY, data);
  };

  const [showAdd, setShowAdd] = useState(false);
  const handleAdd = () => {
    setShowAdd(true);
  };

  const handleSubmit = (title) => {
    setTodoList(currentTodoList => [
      { title, status: new Date().toLocaleString() },
      ...currentTodoList
    ]);

    setShowAdd(false);
  };

  const [dragItem, setDragItem] = useState(null);
  const [dragSource, setDragSource] = useState(null);
  const [dragTarget, setDragTarget] = useState(null);

  const handleDrop = () => {
    if (!dragItem || !dragSource || !dragTarget || dragSource === dragTarget) {
      return;
    }

    const updaters = {
      [COLUMN_KEY_TODO]: setTodoList,
      [COLUMN_KEY_ONGOING]: setOngoingList,
      [COLUMN_KEY_DONE]: setDoneList
    };

    if (dragSource) {
      updaters[dragSource](
        (currentStat) => {
          currentStat.filter((item) => !Object.is(item, dragItem))
        }
      );
    }

    if (dragTarget) {
      updaters[dragTarget](
        (currentStat) => [dragItem, ...currentStat]
      );
    }
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
        <h1>React Learning
          <button onClick={handleSaveAll}>Save All</button>
        </h1>
        <img src={logo} className="App-logo" alt="logo"/>
      </header>
      <KanbanBoard>
        {
          loading ? (<KanbanColumn title="Loading..."/>) : (
            <>
              <KanbanColumn
                className="column-todo" title={todoTitle}
                setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_TODO : null)}
                setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_TODO : null)}
                onDrop={handleDrop}
              >
                {showAdd && <KanbanNewCard onSubmit={handleSubmit}/>}
                {
                  todoList.map(props => (<KanbanCard
                      key={props.title}
                      onDragStart={() => setDragItem(props)}
                      {...props}
                    />)
                  )
                }
              </KanbanColumn>
              <KanbanColumn
                className="column-ongoing" title="Ongoing"
                setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_ONGOING : null)}
                setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_ONGOING : null)}
                onDrop={handleDrop}
              >
                {
                  ongoingList.map(props => (
                    <KanbanCard
                      key={props.title}
                      onDragStart={() => setDragItem(props)}
                      {...props}
                    />)
                  )
                }
              </KanbanColumn>
              <KanbanColumn
                className="column-done" title="Done"
                setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_DONE : null)}
                setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_DONE : null)}
                onDrop={handleDrop}
              >
                {
                  doneList.map(props => (<KanbanCard
                      key={props.title}
                      onDragStart={() => setDragItem(props)}
                      {...props}
                    />)
                  )
                }
              </KanbanColumn>
            </>
          )
        }
      </KanbanBoard>
    </div>
  );
}

export default App;
