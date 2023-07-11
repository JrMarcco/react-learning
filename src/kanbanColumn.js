import React from "react";

export default function KanbanColumn({
  children, className, title,
  setIsDragSource = (isSrc) => {
  },
  setIsDragTarget = (isTgt) => {
  },
  onDrop
}) {
  const combinedClassName = `kanban-column ${className}`;

  const handleDragStart = () => {
    setIsDragSource(true)
  };

  const handleDragOver = (evt) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
    setIsDragTarget(true);
  };

  const handleDragLeave = (evt) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "none";
    setIsDragTarget(false);
  };

  const handleDrop = (evt) => {
    evt.preventDefault();
    onDrop && onDrop(evt)
  };

  const handleDragEnd = (evt) => {
    evt.preventDefault();
    setIsDragSource(false);
    setIsDragTarget(false);
  };

  return (
    <section
      className={combinedClassName}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
    >
      <h2>{title}</h2>
      <ul>{children}</ul>
    </section>
  );
};