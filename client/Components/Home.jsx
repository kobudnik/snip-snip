import React, { useEffect } from 'react';
import TextEditor from './TextEditor.jsx';
import SavedEditors from './SavedEditors.jsx';
import { useParams } from 'react-router-dom';
import { useData } from '../Providers/DataProvider.jsx';
import Folders from './Folders.jsx';

const Home = () => {
  const { posts, setPosts, folders } = useData();

  const { currentFolder } = useParams();

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
        <TextEditor currentFolder={currentFolder} />
        <div className='mt-10'>
          {posts.length > 0
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
