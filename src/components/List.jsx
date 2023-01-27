import React from 'react';

function List({ list, onAddTaskPopup, onTaskPopup, onRemoveList, onRemoveTask, onDrop, onDrag }) {
  let onDropTask = 0;
  debugger;
  function dragOverHandler(e) {
    e.preventDefault();
    if (e.target.className.includes('list__text-container')) {
      e.target.style.boxShadow = '0 2px 3px red';
    }
  }
  function dragLeaveHandler(e) {
    e.target.style.boxShadow = 'none';
  }
  function dragStartHandler(e, task) {
    onDrag(task, list.id);
  }
  function dragEndHandler(e) {
    e.target.style.boxShadow = 'none';
  }
  function dropHandler(e, task) {
    e.preventDefault();
    e.target.style.boxShadow = 'none';
    onDropTask = 1;
    onDrop(task, list);
  }
  function dropListHndler(e) {
    e.preventDefault();
    if (!onDropTask) onDrop(null, list);
    return;
  }

  React.useEffect(() => {
    return () => (onDropTask = 0);
  });

  return (
    <div className="list" onDragOver={(e) => dragOverHandler(e)} onDrop={(e) => dropListHndler(e)}>
      <div className="list__title-container">
        <h2 className="list__title" id={list.id}>
          {list.name}
        </h2>
        <button
          type="button"
          className="list__close-button"
          onClick={(e) => onRemoveList(e.target)}></button>
      </div>
      {list.taskList
        ? list.taskList.map((task, key) => (
            <div
              className={`list__text-container ${
                list.name === 'Done' ? 'list__text-container-done' : ''
              }`}
              id={task.id}
              key={key}
              draggable="true"
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragStart={(e) => dragStartHandler(e, task)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDrop={(e) => dropHandler(e, task)}
              onClick={() => onTaskPopup(task)}>
              <p className={`list__text ${list.name === 'Done' ? 'list__text-done' : ''}`}>
                {task.task}
              </p>
              <button
                type="button"
                className="list__text-remove-button"
                onClick={(e) => onRemoveTask(e.target)}></button>
            </div>
          ))
        : ''}
      <button className="list__button" onClick={(e) => onAddTaskPopup(e.target)}>
        Add Task
      </button>
    </div>
  );
}

export default List;
