import React, { useEffect, useRef, useState } from "react";

const MINUTE = 60 * 1000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const UPDATE_INTERVAL = MINUTE
export default function KanbanCard({ title, status, onDragStart }) {

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

  const handleDragStart = (evt) => {
    evt.dataTransfer.effectAllowed = true;
    evt.dataTransfer.setData("text/plain", title);
    onDragStart && onDragStart(evt)
  };

  return (
    <li className="kanban-card" draggable={true} onDragStart={handleDragStart}>
      <div className="card-title">{title}</div>
      <div className="card-status" title={status}>{displayTime}</div>
    </li>
  );
};

