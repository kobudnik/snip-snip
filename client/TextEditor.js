import React, { useRef, useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';

const TextEditor = () => {
  const [snipState, setSnipState] = useState();

  const onChange = React.useCallback((value, viewUpdate) => {
    setSnipState(value);
  }, []);

  const PostSnippet = () => {
    fetch('/api/snipped', {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(snipState),
    }).then((data) => {
      console.log(data.body);
    });
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
      <button onClick={getSnippet}>Save Snippet</button>
    </div>
  );
};
export default TextEditor;
