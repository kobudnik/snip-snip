import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { dracula } from '@uiw/codemirror-theme-dracula';
import Actions from './Actions.jsx';

const TextEditor = ({
  editorState,
  handleChange,
  handleFocus,
  postSnippet,
  postErr,
  reset,
}) => {
  const editor = (
    <CodeMirror
      id='texteditor'
      value={editorState}
      height='25vh'
      width='50vw'
      fontSize='24'
      extensions={[
        javascript({ jsx: true, typescript: true }),
        python(),
        java(),
      ]}
      theme={dracula}
      placeholder='Give me your code.'
      onChange={handleChange}
      onFocus={handleFocus}
    />
  );

  return (
    <div
      id='textBox'
      className='flex flex-col items-center justify-center mt-8 mb-3 relative'
    >
      {editor}
      <div className='flex justify-around mt-3'>
        <button
          data-te-ripple-init
          data-te-ripple-color='light'
          className='inline-block w-60 px-6 py-2 mr-2
     text-md font-medium text-center rounded  text-rose-100 bg-rose-500 hover:bg-rose-400'
          onClick={reset}
        >
          Reset
        </button>
        <button
          data-te-ripple-init
          data-te-ripple-color='light'
          className='w-60 px-6 py-2 inline-block text-md font-medium text-center rounded  text-white bg-green-700
          hover:bg-green-600'
          onClick={postSnippet}
        >
          Submit
        </button>
      </div>
      {postErr.networkErr && <div> Unable to post new snippet </div>}
      {postErr.minLengthErr && <div> Minimum 4 chars </div>}
      <Actions />
    </div>
  );
};

export default TextEditor;
