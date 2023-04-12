import React, { useState, useEffect, useCallback } from 'react';
import TextEditor from './TextEditor.jsx';
import SavedEditors from './SavedEditors.jsx';
import { useParams } from 'react-router-dom';
import { useData } from '../Providers/DataProvider.jsx';
import Folders from './Folders.jsx';

const Home = () => {
  const [editorState, setEditorState] = useState('');

  const [postErr, setPostErr] = useState({
    minLengthErr: false,
    networkErr: false,
  });

  const { posts, setPosts, folders } = useData();

  const { currentFolder } = useParams();

  const resetEditor = () => {
    const lines = document.getElementsByClassName('cm-line');
    const arrayed = Array.from(lines);
    arrayed.forEach((el) => (el.innerText = ''));
    setPostErr(false);
  };

  const handleChange = (value, viewUpdate) => {
    setEditorState(value);
  };

  const handleFocus = () => {
    setPostErr({ minLengthErr: false, networkErr: false });
  };

  const postSnippet = useCallback(async () => {
    if (editorState.length <= 3) {
      setPostErr((prev) => ({
        ...prev,
        minLengthErr: true,
      }));
      return;
    }
    const folderID = folders[currentFolder];

    const posted = await fetch('/api/snipped', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folderID, snippet: editorState }),
    });
    if (posted.status >= 400) {
      setPostErr(true);
    } else {
      const parsed = await posted.json();
      setPosts([...posts, parsed]);
      setPostErr({ minLengthErr: false, networkErr: false });
      resetEditor();
    }
  }, [editorState, currentFolder]);

  useEffect(() => {
    if (folders.default) {
      const folderID = folders[currentFolder];
      fetch(`/api/snipped/${folderID}`)
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

  return (
    <>
      <div className='bg-gray-900 grow mt-20 flex flex-col '>
        <Folders currentFolder={currentFolder} />
        <TextEditor
          postErr={postErr}
          postSnippet={postSnippet}
          handleChange={handleChange}
          handleFocus={handleFocus}
          posts={posts}
          reset={resetEditor}
        />
        <div className='mt-10'>
          {posts.length
            ? posts.map((post, i) => (
                <div key={post.id.toString()}>
                  <SavedEditors val={post.snippet} id={post.id}></SavedEditors>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default Home;
