import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = (task) => {
  const [value, setValue] = React.useState(task.task ? task.task.description : '');

  console.log(task.task ? task.task.description : '');
  console.log(value);

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      modules={{
        toolbar: [[{ header: [1, 2, false] }], ['bold', 'italic', 'underline'], ['link', 'image']],
      }}
      formats={['header', 'bold', 'italic', 'underline', 'link', 'image']}
      customModules={{ toolbar: 'ql-toolbar' }}
    />
  );
};

export default TextEditor;
