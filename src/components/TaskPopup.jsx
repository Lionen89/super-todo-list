import React, { useState } from 'react';
import Popup from './Popup';

function TaskPopup({ task, isOpen, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [description, setdDescription] = useState('');
  const [isImputAvaible, setIsImputAvaible] = useState(false);

  const handleInputAvaible = () => {
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
          value={task ? task.task : name}
          placeholder={task ? task.task : name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </label>
      <label className="popup__form-field">
        <input
          type="text"
          className="popup__input popup__text"
          id="description-input"
          name="description"
          minLength="1"
          maxLength="1000"
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setdDescription(e.target.value);
          }}
        />
      </label>
    </Popup>
  );
}
export default TaskPopup;
