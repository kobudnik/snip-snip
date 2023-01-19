import React, { useRef, useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import SavedEditors from './SavedEditors';
import { resolveFSPath } from '@babel/plugin-transform-runtime/lib/get-runtime-path';

const TextEditor = () => {
  const [snipState, setSnipState] = useState('');
  const [posts, setPosts] = useState([]);

  const onChange = React.useCallback((value, viewUpdate) => {
    setSnipState(value);
  }, []);

  const PostSnippet = async () => {
    const value = snipState;

    //POST AND UPDATE STATE
    const posted = await fetch('/api/snipped', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ snippet: snipState }),
    });
    const parsed = await posted.json();
    const storePosts = await getSnippet();
    storePosts.forEach((snip) => {
      setPosts([...posts, snip]);
    });
    console.log('after post await returned in POST SNIPPED AFTER GET');
  };

  //DEFINING GET TO BE USED AFTER POSTING
  const getSnippet = async () => {
    const receivedSnip = await fetch('/api/snipped');
    const parsedSnip = await receivedSnip.json();
    console.log(parsedSnip);
    console.log('AFTER PARSED SNiP IN GET sniPPET REquesT');
    return parsedSnip;
    // console.log(parsedSnip);
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
      onChange={onChange}
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
