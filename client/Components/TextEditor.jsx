import React from 'react';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { useData } from '../Providers/DataProvider.jsx';

const TextEditor = ({ editorState, onChange, postSnippet, postErr, reset }) => {
  const { usePostFolder } = useData();

  const editor = (
    <CodeMirror
      id='texteditor'
      value={editorState}
      height='25vh'
      width='50vw'
      extensions={[
        javascript({ jsx: true, typescript: true }),
        python(),
        java(),
      ]}
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
      <button onClick={usePostFolder}>ADD A NEW FOLDER BOYO</button>
    </div>
  );
};
export default TextEditor;
