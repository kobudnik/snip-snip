import React, { useState, useEffect, useCallback } from 'react';
import TextEditor from './TextEditor.jsx';
import SavedEditors from './SavedEditors.jsx';
import { useUsername } from '../Providers/UserProvider.jsx';
import { useParams } from 'react-router-dom';
import { useData } from '../Providers/DataProvider.jsx';
import Folders from './Folders.jsx';

const Home = () => {
  const [editorState, setEditorState] = useState('');

  const [postErr, setPostErr] = useState({
    minLengthErr: false,
    networkErr: false,
  });

  const {
    posts,
    setPosts,
    setFolders,
    folders,
    selection,
    setSelection,
    folderNames,
  } = useData();

  const { username } = useUsername();
  const { currentFolder } = useParams();

  useEffect(() => {
    if (folders.length) {
      const folderID = folders.filter(({ name }) => name === currentFolder)[0]
        ?.id;

      fetch('/api/snipped')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setPosts(data);
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  }, [folders, currentFolder]);

  const resetEditor = () => {
    const lines = document.getElementsByClassName('cm-line');
    const arrayed = Array.from(lines);
    arrayed.forEach((el) => (el.innerText = ''));
    setPostErr(false);
  };

  const handleChange = useCallback((value, viewUpdate) => {
    setEditorState(value);
  }, []);

  const handleFocus = useCallback(() =>
    setPostErr({ minLengthErr: false, networkErr: false }),
  );
  const postSnippet = async () => {
    if (editorState.length <= 3) {
      setPostErr((prev) => ({
        ...prev,
        minLengthErr: true,
      }));
      return;
    }
    const posted = await fetch('/api/snipped', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ snippet: editorState }),
    });
    if (posted.status >= 400) {
      setPostErr(true);
    } else {
      const parsed = await posted.json();
      setPosts([...posts, parsed]);
      setPostErr({ minLengthErr: false, networkErr: false });
      resetEditor();
    }
  };

  return (
    <div className='bg-gray-900'>
      <p>{username}</p>
      <Folders currentFolder={currentFolder} />
      <TextEditor
        postErr={postErr}
        postSnippet={postSnippet}
        handleChange={handleChange}
        handleFocus={handleFocus}
        posts={posts}
        reset={resetEditor}
      />
      {posts &&
        posts.map((post, i) => (
          <div key={post.id.toString()}>
            <SavedEditors val={post.snippet} inputID={post.id}></SavedEditors>
          </div>
        ))}
    </div>
  );
};

export default Home;
