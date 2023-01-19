import React, { useState } from 'react';
import Popup from './Popup';

function AddTaskPopup({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [description, setdDescription] = useState('');
  const handleClosePopup = () => {
    onClose();
    setName('');
    setdDescription('');
  };
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(name, description);
    handleClosePopup();
  }

  return (
    <Popup title="Add Tsk" isOpen={isOpen} onClose={handleClosePopup} onSubmit={handleSubmit}>
      <label className="popup__form-field">
        <input
          type="text"
          className="popup__input popup__text"
          id="name-input"
          name="name"
          required
          minLength="2"
          maxLength="200"
          value={name}
          placeholder="Task name"
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
          minLength="2"
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
export default AddTaskPopup;
