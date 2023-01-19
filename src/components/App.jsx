import React, { useState } from 'react';
import List from './List';
import Header from './Header';
import Footer from './Footer';
import AddListPopup from './AddListPopup';
import { useDispatch, useSelector } from 'react-redux';
import { addList, addTaskList, removeTask, removeList } from '../redux/listSlice';
import AddTaskPopup from './AddTaskPopup';

function App() {
  const [isAddTaskPopupOpen, setIsAddTaskPopupOpen] = useState(false);
  const [isAddListPopupOpen, setIsAddListkPopupOpen] = useState(false);
  const [currentListId, setCurrentListId] = useState(0);

  const dispatch = useDispatch();
  const list = useSelector((state) => state.list);

  function handleAddNewList(listName) {
    dispatch(addList(listName));
    handlePopupClose();
  }

  function handleAddNewTask(task, description) {
    dispatch(addTaskList({ task, description, currentListId }));
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
