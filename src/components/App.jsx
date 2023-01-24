import React, { useState } from 'react';
import List from './List';
import Header from './Header';
import Footer from './Footer';
import AddListPopup from './AddListPopup';
import { useDispatch, useSelector } from 'react-redux';
import { addList, addTask, removeTask, removeList, dragTask } from '../redux/listSlice';
import AddTaskPopup from './AddTaskPopup';

function App() {
  const [isAddTaskPopupOpen, setIsAddTaskPopupOpen] = useState(false);
  const [isAddListPopupOpen, setIsAddListkPopupOpen] = useState(false);
  const [currentListId, setCurrentListId] = useState(0);
  const [dragtTask, setDrag] = React.useState(null);

  const dispatch = useDispatch();
  const list = useSelector((state) => state.list);
  console.log(list);

  function handleAddNewList(listName) {
    dispatch(addList(listName));
    handlePopupClose();
  }

  function handleAddNewTask(task, description) {
    dispatch(addTask({ task, description, currentListId }));
    handlePopupClose();
  }

  function handleTaskPopupOpen(target) {
    setCurrentListId(target.parentElement.firstChild.firstChild.id);
    setIsAddTaskPopupOpen(true);
  }

  function handleListPopupOpen() {
    setIsAddListkPopupOpen(true);
  }
  function handlePopupClose() {
    setIsAddTaskPopupOpen(false);
    setIsAddListkPopupOpen(false);
  }
  function handleListRemove(target) {
    dispatch(removeList(target.parentElement.firstChild.id));
  }
  function handleTaskRemove(target) {
    const selectedTaskId = target.parentElement.id;
    const selectedListId = target.parentElement.parentElement.firstChild.firstChild.id;
    dispatch(removeTask({ selectedListId, selectedTaskId }));
  }
  function taskDragHendler(dragtTask, dragListId) {
    setDrag(dragtTask);
    setCurrentListId(dragListId);
  }
  function taskDropHendler(task, list) {
    const selectedTaskId = dragtTask.id;
    const selectedListId = currentListId;
    dispatch(removeTask({ selectedListId, selectedTaskId }));
    dispatch(dragTask({ dragtTask, task, list }));
    setDrag(null);
  }
  return (
    <div className="main-page">
      <div className="main-page__container">
        <Header onOpenPopup={handleListPopupOpen} />
        <div className="body">
          {list.list.map((i, key) => {
            return (
              <List
                key={key}
                list={i}
                onOpenPopup={handleTaskPopupOpen}
                onRemoveList={handleListRemove}
                onRemoveTask={handleTaskRemove}
                onDrop={taskDropHendler}
                onDrag={taskDragHendler}
              />
            );
          })}
        </div>
        <Footer />
      </div>
      <AddTaskPopup
        isOpen={isAddTaskPopupOpen}
        onClose={handlePopupClose}
        onSubmit={handleAddNewTask}
      />
      <AddListPopup
        isOpen={isAddListPopupOpen}
        onClose={handlePopupClose}
        onSubmit={handleAddNewList}
      />
    </div>
  );
}

export default App;
