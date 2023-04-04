import React, { useState, useEffect, useCallback } from 'react';
import Header from './Header.jsx';
import TextEditor from './TextEditor.jsx';
import SavedEditors from './SavedEditors.jsx';
import '../index.css';
import { useUsername } from '../contextProviders.jsx';

const Home = () => {
  const [snipState, setSnipState] = useState('');
  const [posts, setPosts] = useState([]);
  const [folders, setFolders] = useState([]);

  //created to trigger new fetch after deletion (may just return all remaining snippets from that particular folder, however, in which case this may not be necessary)
  const [shouldFetch, setShouldFetch] = useState(true);
  const [postErr, setPostErr] = useState({
    minLengthErr: false,
    networkErr: false,
  });
  const onChange = useCallback((value, viewUpdate) => {
    setSnipState(value);
  }, []);

  const postSnippet = async () => {
    if (snipState.length <= 3) {
      setPostErr((prev) => ({
        ...prev,
        minLengthErr: true,
      }));
      return;
    }
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
      setPostErr({ minLengthErr: false, networkErr: false });
    }
  };

  const reset = () => {
    const lines = document.getElementsByClassName('cm-line');
    const arrayed = Array.from(lines);
    arrayed.forEach((el) => (el.innerText = ''));
    setPostErr(false);
  };

  useEffect(() => {
    if (shouldFetch) {
      fetch('/api/snipped')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setPosts(data);
        })
        .catch((e) => {
          console.log(e.message);
        })
        .finally(() => {
          setShouldFetch(false);
        });
    }
  }, [shouldFetch]);

  const { username } = useUsername();

  return (
    <div className='headContainer'>
      <p>{username}</p>
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

export default Home;
