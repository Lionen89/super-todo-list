import React from 'react';

function List({ list, onOpenPopup, onRemoveList, onRemoveTask }) {
  function dragOverHandler(e) {
    e.preventDefault();
    if (e.target.className == 'list__text-container') {
      e.target.style.boxShadow = '0 2px 3px red';
    }
  }
  function dragLeaveHandler(e) {
    e.target.style.boxShadow = 'none';
  }
  function dragStartHandler(e, task) {}
  function dragEndHandler(e) {
    e.target.style.boxShadow = 'none';
  }
  function dropHandler(e, task) {
    e.preventDefault();
    console.log('drop', task);
  }

  return (
    <div className="list" graggable>
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
              className="list__text-container"
              id={task.id}
              key={key}
              graggable={true}
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragStart={(e) => dragStartHandler(e, task)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDrop={(e) => dropHandler(e, task)}>
              <p className="list__text">{task.task}</p>
              <button
                type="button"
                className="list__text-remove-button"
                onClick={(e) => onRemoveTask(e.target)}></button>
            </div>
          ))
        : ''}
      <button className="list__button" onClick={(e) => onOpenPopup(e.target)}>
        Add Task
      </button>
    </div>
  );
}

export default List;
