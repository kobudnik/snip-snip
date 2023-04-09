import React from 'react';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { useData } from '../Providers/DataProvider.jsx';

const TextEditor = ({
  editorState,
  handleChange,
  handleFocus,
  postSnippet,
  postErr,
  reset,
}) => {
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
      onChange={handleChange}
      onFocus={handleFocus}
    />
  );

  return (
    <div id='textBox' className='flex flex-col items-center justify-center'>
      {editor}
      <button
        data-te-ripple-init
        data-te-ripple-color='light'
        className='inline-block w-40 px-6
        py-2 text-sm font-medium text-center rounded text-white bg-green-700
        hover:bg-green-600'
        onClick={postSnippet}
      >
        SAVE
      </button>
      <button
        data-te-ripple-init
        data-te-ripple-color='light'
        className='w-40 px-6 py-2 text-sm font-medium text-center rounded text-rose-100 bg-rose-600 hover:bg-rose-500'
        onClick={reset}
      >
        Reset
      </button>
      {postErr.networkErr && <div> Unable to post new snippet </div>}
      {postErr.minLengthErr && <div> Minimum 3 chars </div>}
      {/* <label
        htmlFor='actions'
        className='mb-2 text-sm font-medium text-xl text-gray-900 dark:text-white'
      >
        Select an option
      </label> */}
      <select
        id='actions'
        className='focus:outline-none inline-block w-1/4 text-xl bg-gray-50 text-center border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white '
      >
        <option value=''>--Select an action--</option>
        <option value='PUT'>Move snippet</option>

        <option value='DELETE'>Delete</option>
      </select>
      {/* <label htmlFor='dropdown'>Select an option:</label>
      
      <select id='dropdown' name='dropdown'>
        <option value=''>--Select--</option>
        <option value='delete'>Delete</option>
      </select> */}
      <button
        data-te-ripple-init
        data-te-ripple-color='light'
        className='w-40 px-6
        py-2 text-sm font-medium text-center rounded text-white bg-green-700
        hover:bg-green-600'
        onClick={usePostFolder}
      >
        ADD A NEW FOLDER BOYO
      </button>
    </div>
  );
};

export default TextEditor;
