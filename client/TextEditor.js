import React, { useRef, useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';

const TextEditor = () => {
  const [snipState, setSnipState] = useState();

  const onChange = React.useCallback((value, viewUpdate) => {
    setSnipState(value);
  }, []);

  const PostSnippet = async () => {
    console.log(typeof snipState === 'string'); //true
    console.log(JSON.stringify(snipState)); //does this correctly too
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

  return (
    <div className='textBox'>
      <CodeMirror
        value="console.log('hello world!');"
        height='200px'
        width='50vw'
        extensions={[javascript({ jsx: true })]}
        theme={dracula}
        onChange={onChange}
      />{' '}
      <button onClick={PostSnippet}>Save Snippet</button>
    </div>
  );
};
export default TextEditor;
