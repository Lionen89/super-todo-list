import React, { useState } from 'react';
import Popup from './Popup';
import { Editor } from '@tinymce/tinymce-react';

function TaskPopup({ task, isOpen, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [description, setdDescription] = useState('');
  const [isImputAvaible, setIsImputAvaible] = useState(false);

  const editorRef = React.useRef(null);

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
          placeholder={task ? task.task : name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </label>
      {/* <Editor
        onChange={(e) => setdDescription(e.target.value)}
        onInit={(evt, editor) => (editorRef.current = editor)}
        apiKey="oug2n2d2fkcywv3nsjnv4es802v7zzshilf6j898bqfwgndj"
        initialValue={`<p>${task ? task.description : ''}</p>`}
        init={{
          height: 200,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'insertdatetime',
            'media',
            'table',
            'code',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      /> */}
      <label className="popup__form-field">
        <textarea
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
