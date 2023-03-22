import React, { useRef, useState, useEffect, useCallback } from 'react';
import Header from './Components/Header.js';
import TextEditor from './Components/TextEditor.js';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import SavedEditors from './Components/SavedEditors';
import './index.css';

const App = () => {
  const [snipState, setSnipState] = useState('');
  const [posts, setPosts] = useState([]);
  const [postErr, setPostErr] = useState(false);
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
    if (posted.status >= 400) {
      setPostErr(true);
    } else {
      const parsed = await posted.json();
      setPosts([...posts, parsed]);
      setPostErr(false);
    }
  };

  const reset = () => {
    const lines = document.getElementsByClassName('cm-line');
    const arrayed = Array.from(lines);
    arrayed.forEach((el) => (el.innerText = ''));
    setPostErr(false);
  };

  useEffect(() => {
    fetch('/api/snipped')
      .then((res) => {
        if (res.status >= 400) throw { message: 'Problem retrieving data' };
        else return res.json();
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return (
    <div className='headContainer'>
      <Header />
      <TextEditor
        postErr={postErr}
        reset={reset}
        postSnippet={postSnippet}
        onChange={onChange}
        posts={posts}
      />
      {posts &&
        posts.map((post, i) => (
          <div className='textBox'>
            <SavedEditors savedID={i} val={post.snippet}></SavedEditors>
          </div>
        ))}
    </div>
  );
  //<p>{!data ? 'Loading...' : data}</p>;
};

export default App;
