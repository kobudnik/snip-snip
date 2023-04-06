import React, { useState, useEffect, useCallback, useMemo } from 'react';
import TextEditor from './TextEditor.jsx';
import SavedEditors from './SavedEditors.jsx';
import '../index.css';
import { useUsername } from '../ContextProviders/UserProvider.jsx';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import { useData } from '../ContextProviders/DataProvider.jsx';
import Folders from './Folders.jsx';

const Home = () => {
  const [editorState, setEditorState] = useState('');

  const [postErr, setPostErr] = useState({
    minLengthErr: false,
    networkErr: false,
  });

  const [currentFolder, setCurrentFolder] = useState('');

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
  const { folder } = useParams();

  useEffect(() => {
    if (folders.length) {
      console.log(folders, 'preconditional');
      console.log(folder, 'this is the folder param');
      const folderID = folders.filter(
        (eachFolder) => eachFolder.name === folder,
      )[0].id;
      console.log(folderID, 'this is the folder id!!');
      console.log(folders);
      console.log(folder, 'this is folder name inside useeffect');
      const id = folders.filter((eachFolder) => eachFolder.name === folder);
      console.log(id, 'These are posts in use effect');
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
  }, [folders, folder]);

  const resetEditor = () => {
    const lines = document.getElementsByClassName('cm-line');
    const arrayed = Array.from(lines);
    arrayed.forEach((el) => (el.innerText = ''));
    setPostErr(false);
  };

  const onChange = useCallback((value, viewUpdate) => {
    setEditorState(value);
  }, []);
  const postSnippet = async () => {
    console.log(editorState);
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
    <div className='headContainer'>
      <p>{username}</p>
      <Folders currentFolder='default' />
      <TextEditor
        postErr={postErr}
        postSnippet={postSnippet}
        onChange={onChange}
        posts={posts}
        reset={resetEditor}
      />
      {posts &&
        posts.map((post, i) => (
          <div className='textBox' key={post.id.toString()}>
            <SavedEditors val={post.snippet} inputID={post.id}></SavedEditors>
          </div>
        ))}
    </div>
  );
};

export default Home;
