import React, { useRef, useState, useEffect, useCallback } from 'react';
import Header from './Header';
import TextEditor from './TextEditor';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import SavedEditors from './SavedEditors';

import './index.css';

const App = () => {
  const [snipState, setSnipState] = useState('');
  const [posts, setPosts] = useState([]);
  const onChange = useCallback((value, viewUpdate) => {
    setSnipState(value);
  }, []);

  //POST AND UPDATE STATE
  //need to implement error handling here. if status 200 else show some error message or something
  const postSnippet = async () => {
    const posted = await fetch('/api/snipped', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ snippet: snipState }),
    });
    const parsed = await posted.json();
    setPosts([...posts, parsed]);
    console.log(posts);
  };

  // const getSnippet = async () => {
  //   const receivedSnip = await fetch('/api/snipped');
  //   const parsedSnip = await receivedSnip.json();
  //   let newState = [];
  //   parsedSnip.forEach((snip) => {
  //     // console.log(snip);
  //     newState.push(snip);
  //   });
  //   setPosts([...posts, newState]);
  //   console.log(posts);
  //   return;
  // };

  const reset = () => {
    const lines = document.getElementsByClassName('cm-line');
    const arrayed = Array.from(lines);
    arrayed.forEach((el) => (el.innerText = ''));
  };

  useEffect(() => {
    fetch('/api/snipped')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  return (
    <div className='headContainer'>
      <Header />
      <TextEditor
        reset={reset}
        postSnippet={postSnippet}
        change={onChange}
        posts={posts}
      />
    </div>
  );
  //<p>{!data ? 'Loading...' : data}</p>;
};

export default App;
