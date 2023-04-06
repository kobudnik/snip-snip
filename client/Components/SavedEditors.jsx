import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';

const SavedEditors = ({ val, inputID }) => {
  const editor = (
    <CodeMirror
      value={val}
      height='200px'
      width='50vw'
      extensions={[javascript({ jsx: true })]}
      theme={dracula}
      placeholder='Give me your code.'
      readOnly='true'
    />
  );
  return (
    <div className='editor-container'>
      {editor}
      <input type='checkbox' className='checkbox' id={inputID}></input>
    </div>
  );
};

export default SavedEditors;
