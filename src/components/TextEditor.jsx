import React from 'react';
import { Editor, EditorState } from 'draft-js';

const TextEditor = (task) => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty(task ? task.description : ''),
  );

  return (
    <Editor
      editorState={editorState}
      onChange={setEditorState}
      placeholder={task ? task.description : ''}
    />
  );
};

export default TextEditor;
