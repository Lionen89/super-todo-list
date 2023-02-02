import React, { useState } from 'react';
import Popup from './Popup';
import TextEditor from './TextEditor';

function TaskPopup({ task, isOpen, onClose, onSubmit }) {
  const [name, setName] = useState(task ? task.task : '');
  const [description, setdDescription] = useState(task ? task.description : '');
  const [isImputAvaible, setIsImputAvaible] = useState(false);
  const [isDescriptionAvaible, setIsDescriptionAvaible] = useState(false);

  const handleInputAvaible = () => {
    setName(task.task);
    setIsImputAvaible(!isImputAvaible);
  };

  const handleDescroptionAvaible = () => {
    setdDescription(task.description);
    setIsDescriptionAvaible(!isDescriptionAvaible);
  };

  const handleClosePopup = () => {
    onClose();
    setName('');
    setdDescription('');
    setIsImputAvaible(false);
    setIsDescriptionAvaible(false);
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
          value={name}
          placeholder={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </label>
      <label className="popup__form-field">
        {/* <TextEditor task={task} /> */}
        <h2
          className={`popup__text popup__text-task ${
            isDescriptionAvaible ? 'popup__input-unavaible' : ''
          }`}
          onClick={handleDescroptionAvaible}>
          {task ? task.description : ''}
        </h2>
        <textarea
          type="text"
          className={`popup__input popup__text ${
            !isDescriptionAvaible ? 'popup__input-unavaible' : ''
          }`}
          id="description-input"
          name="description"
          minLength="1"
          maxLength="1000"
          value={description}
          placeholder={description}
          onChange={(e) => {
            setdDescription(e.target.value);
          }}
        />
      </label>
    </Popup>
  );
}
export default TaskPopup;
