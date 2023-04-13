import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { useData } from '../Providers/DataProvider.jsx';
import Actions from './Actions.jsx';

const TextEditor = ({ currentFolder }) => {
  const [editorState, setEditorState] = useState('');

  const [postStatus, setPostStatus] = useState('');

  const statusOptions = {
    error: 'An error occurred',
    minLength: 'Minimum 4 chars..',
    success: 'Success!',
  };

  const handleChange = (value) => {
    setEditorState(value);
  };

  const handleFocus = () => {
    setPostStatus('');
  };

  const resetEditor = () => {
    const lines = document.getElementsByClassName('cm-line');
    const arrayed = Array.from(lines);
    arrayed.forEach((el) => (el.innerText = ''));
    setPostStatus('');
  };

  const { folders, setPosts, posts } = useData();

  const postSnippet = async () => {
    if (editorState.length <= 3) {
      setPostStatus(statusOptions.minLength);
      return;
    }
    const folderID = folders[currentFolder];

    const posted = await fetch('/api/snipped', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folderID, snippet: editorState }),
    });
    if (posted.status >= 400) {
      setPostStatus(statusOptions.error);
    } else {
      const parsed = await posted.json();
      setPosts([...posts, parsed]);
      setPostStatus(statusOptions.success);
    }
  };

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

  useEffect(() => {
    let timeoutId;
    console.log(postStatus);
    if (postStatus === statusOptions.success) {
      timeoutId = setTimeout(() => {
        console.log(postStatus);
        resetEditor();
      }, 2000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [postStatus]);

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
          onClick={resetEditor}
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
      {postStatus && (
        <i
          className={`${
            postStatus === statusOptions.success ? 'text-white' : 'text-red-700'
          } text-xl bold pt-3 `}
        >
          {postStatus}
        </i>
      )}
      <Actions />
    </div>
  );
};
export default TextEditor;
