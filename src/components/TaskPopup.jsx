import React, { useState } from 'react';
import Popup from './Popup';
import TextEditor from './TextEditor';

function TaskPopup({ task, isOpen, onClose, onSubmit }) {
  const [name, setName] = useState(task ? task.task : '');
  const [description, setdDescription] = useState(task ? task.description : '');
  const [isImputAvaible, setIsImputAvaible] = useState(false);
  console.log(task ? task.description : description);

  const handleInputAvaible = () => {
    setName(task.task);
    setIsImputAvaible(!isImputAvaible);
  };

  const handleClosePopup = () => {
    onClose();
    setName('');
    setdDescription('');
    setIsImputAvaible(false);
  };
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(name, description);
    handleClosePopup();
  }
  console.log(description);
  return (
    <Popup title="Task editor" isOpen={isOpen} onClose={handleClosePopup} onSubmit={handleSubmit}>
      <label className="popup__form-field">
        <h2
          className={`popup__text popup__text-task ${
            isImputAvaible ? 'popup__input-unavaible' : ''
          }`}
          onClick={handleInputAvaible}>
          {task ? task.task : ''}
        </h2>
        <input
          type="text"
          className={`popup__input popup__text ${!isImputAvaible ? 'popup__input-unavaible' : ''}`}
          id="name-input"
          name="name"
          required
          minLength="1"
          maxLength="200"
          value={name}
          placeholder={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </label>
      <label className="popup__form-field">
        <TextEditor task={task} />
        {/* <textarea
          type="text"
          className="popup__input popup__text"
          id="description-input"
          name="description"
          minLength="1"
          maxLength="1000"
          placeholder={description}
          onChange={(e) => {
            setdDescription(e.target.value);
          }}>
          {task ? task.description : ''}
        </textarea> */}
      </label>
    </Popup>
  );
}
export default TaskPopup;
