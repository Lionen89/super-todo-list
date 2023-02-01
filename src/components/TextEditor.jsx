import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = (task) => {
  const [value, setValue] = React.useState(task ? task.description : '');

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      placeholder={task ? task.description : ''}
      className="popup__text-editor">
      {task ? task.description : ''}
    </ReactQuill>
  );
};

export default TextEditor;
