import React from 'react';

function List({ list, onOpenPopup, onRemoveList, onRemoveTask }) {
  const testList = [
    { name: 'Backlog', id: 1, order: 1 },
    { name: 'To Do', id: 2, order: 2 },
    { name: 'Done', id: 3, order: 3 },
    { name: 'fhdhd', id: 4, order: 4 },
    { name: 'Dasdasone', id: 5, order: 5 },
  ];
  const [currentTask, setCurrentTask] = React.useState(null);
  const [currentList, setCurrentList] = React.useState(testList);

  function dragOverHandler(e) {
    e.preventDefault();

    if (e.target.className == 'list__text-container') {
      e.target.style.boxShadow = '0 6px 3px red';
    }
  }
  function dragLeaveHandler(e) {
    e.target.style.boxShadow = 'none';
  }
  function dragStartHandler(e, task) {
    setCurrentTask(task);
  }
  function dragEndHandler(e) {
    e.target.style.boxShadow = 'none';
  }
  function dropHandler(e, task) {
    e.preventDefault();
    setCurrentList(
      currentList.map((c) => {
        debugger;
        if ((c.id <= task.id) & (c.id !== currentTask.id)) {
          return { ...c, order: c.id - 1 };
        }
        if (c.id === currentTask.id) {
          return { ...c, order: task.order };
        }
        return c;
      }),
    );
    // const currentIndex = testList.indexOf(task);
    // testList.splice(currentIndex, 1);
    e.target.style.boxShadow = 'none';
  }

  const sortTask = (a, b) => {
    if (a.order > b.order) return 1;
    else return -1;
  };
  console.log(currentList.sort(sortTask));
  return (
    <div className="list" draggable="true">
      <div className="list__title-container">
        <h2 className="list__title" id={list.id}>
          {list.name}
        </h2>
        <button
          type="button"
          className="list__close-button"
          onClick={(e) => onRemoveList(e.target)}></button>
      </div>
      {/* {list.taskList
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
        : ''} */}
      {testList
        ? currentList.sort(sortTask).map((task, key) => (
            <div
              className="list__text-container"
              id={task.id}
              key={key}
              draggable="true"
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragStart={(e) => dragStartHandler(e, task)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDrop={(e) => dropHandler(e, task)}>
              <p className="list__text">{task.name}</p>
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
