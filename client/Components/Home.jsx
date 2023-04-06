import React, { useState, useEffect, useCallback, useMemo } from 'react';
import TextEditor from './TextEditor.jsx';
import SavedEditors from './SavedEditors.jsx';
import '../index.css';
import { useUsername } from '../Providers/UserProvider.jsx';
import { Link } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import { useData } from '../Providers/DataProvider.jsx';
import Folders from './Folders.jsx';

const Home = () => {
  const [editorState, setEditorState] = useState('');
  // const [posts, setPosts] = useState([]);
  // const [folders, setFolders] = useState([]);

  //created to trigger new fetch after deletion (may just return all remaining snippets from that particular folder, however, in which case this may not be necessary)

  const [postErr, setPostErr] = useState({
    minLengthErr: false,
    networkErr: false,
  });

  const { posts, setPosts, setFolders, selection, setSelection, folderNames } =
    useData();

  // const addFolder = async (e) => {
  //   try {
  //     const requestOptions = {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ folderName: 'josiah' }),
  //     };
  //     console.log('adding a folder here');
  //     const postFolder = await fetch('/api/folders', requestOptions);
  //     const retrievedFolders = await postFolder.json();
  //     setFolders(retrievedFolders);
  //   } catch (e) {
  //     console.log('error adding folder in texteditor', e.message);
  //   }
  // };

  // const addFolder = useCallback(async () => {
  //   try {
  //     const requestOptions = {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ folderName: 'josiah' }),
  //     };
  //     const postFolder = await fetch('/api/folders', requestOptions);
  //     const retrievedFolders = await postFolder.json();
  //     console.log(folders, 'in folders callback');
  //     setFolders([...folders, retrievedFolders]);
  //   } catch (e) {
  //     console.log('error adding folder in texteditor', e.message);
  //   }
  // }, [folders]);

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

  useEffect(() => {
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
  }, []);

  const { username } = useUsername();

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
