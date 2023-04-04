import React from 'react';
import CodeMirror, { basicSetup } from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
//think you can use this with state to clear the underlying dom el that this is built on top of . probably in app.js, not here.
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import SavedEditors from './SavedEditors';

const addFolder = async (e) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folderName: 'delilah' }),
    };
    const postFolder = await fetch('/api/folders', requestOptions);
    const response = await postFolder.json();
    console.log(response);
  } catch (e) {
    console.log('error adding folder in texteditor', e.message);
  }
};

const TextEditor = ({ snipState, onChange, postSnippet, reset, postErr }) => {
  const editor = (
    <CodeMirror
      id='instance'
      value={snipState}
      height='200px'
      width='50vw'
      extensions={[javascript({ jsx: true })]}
      theme={dracula}
      placeholder='Give me your code.'
      onChange={onChange}
    />
  );

  return (
    <div className='textBox'>
      {editor}
      <button onClick={postSnippet}>Save Snippet</button>
      <button onClick={reset}>Reset</button>
      {postErr.networkErr && <div> Unable to post new snippet </div>}
      {postErr.minLengthErr && <div> Minimum 3 chars </div>}
      <label htmlFor='dropdown'>Select an option:</label>
      <select id='dropdown' name='dropdown'>
        <option value=''>--Select--</option>
        <option value='delete'>Delete</option>
      </select>
      <button onClick={addFolder}>ADD A NEW FOLDER BOYO</button>
    </div>
  );
};
export default TextEditor;
