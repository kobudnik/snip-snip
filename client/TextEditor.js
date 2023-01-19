import React, { useRef, useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';

const TextEditor = () => {
  const [snipState, setSnipState] = useState('');

  const onChange = React.useCallback((value, viewUpdate) => {
    setSnipState(value);
  }, []);

  const PostSnippet = async () => {
    const value = snipState;
    const posted = await fetch('/api/snipped', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ snippet: value }),
    });
    const parsed = await posted.json();
    console.log(parsed);
  };
  const getSnippet = async () => {
    const receivedSnip = await fetch('/api/snipped');
    const parsedSnip = await receivedSnip.json();
    console.log(parsedSnip);
  };

  const editor = (
    <CodeMirror
      id='instance'
      value={snipState}
      height='200px'
      width='50vw'
      extensions={[javascript({ jsx: true })]}
      theme={dracula}
      placeholder='Give me your code.'
    />
  );

  const reset = () => {
    const lines = document.getElementsByClassName('cm-line');
    const arrayed = Array.from(lines);
    arrayed.forEach((el) => (el.innerText = ''));
  };

  return (
    <div className='textBox'>
      {editor}
      <button onClick={PostSnippet}>Save Snippet</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};
export default TextEditor;
