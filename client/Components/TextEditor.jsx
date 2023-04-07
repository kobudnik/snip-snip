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
      <button
        type='button'
        data-te-ripple-init
        data-te-ripple-color='light'
        className='inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]'
        onClick={reset}
      >
        Reset
      </button>
      {postErr.networkErr && <div> Unable to post new snippet </div>}
      {postErr.minLengthErr && <div> Minimum 3 chars </div>}
      <label htmlFor='dropdown'>Select an option:</label>
      <select id='dropdown' name='dropdown'>
        <option value=''>--Select--</option>
        <option value='delete'>Delete</option>
      </select>
      <button onClick={usePostFolder}>ADD A NEW FOLDER BOYO</button>
      <button className='relative px-6 py-2 group'>
        <span className='absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
        <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
        <span className='relative text-black group-hover:text-white'>
          {' '}
          hover effect
        </span>
      </button>
      <div className='flex'>
        <button
          type='button'
          className='inline-flex items-center px-6 py-2 text-sm font-medium text-center rounded text-rose-100 bg-rose-500 hover:bg-rose-600'
        >
          Read more
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-6 h-6 ml-2 mt-0.5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M17 8l4 4m0 0l-4 4m4-4H3'
            />
          </svg>
        </button>
        <button
          type='button'
          className='inline-flex items-center px-6 py-2 text-sm text-center rounded text-cyan-500 bg-cyan-100 hover:bg-cyan-200'
        >
          Read more
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-6 h-6 ml-2 mt-0.5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M17 8l4 4m0 0l-4 4m4-4H3'
            />
          </svg>
        </button>
        <button className='inline-flex items-center px-6 py-2 text-sm text-green-100 bg-green-600 rounded hover:bg-green-700'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-5 h-5 mr-2 text-white'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
            />
          </svg>
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
