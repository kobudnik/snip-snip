import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TextEditor from './TextEditor';
import Folders from './Folders';
import SavedEditors from './SavedEditors';
import { useData } from '../Providers/DataProvider';

function Home() {
  const { posts, setPosts, folders } = useData();
  const [editStarted, setEditStarted] = useState(false);

  const { currentFolder } = useParams();

  useEffect(() => {
    if (folders.home) {
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
  }, [folders, currentFolder, setPosts]);

  return (
    <div className='bg-gray-900 grow mt-20 flex flex-col '>
      <Folders currentFolder={currentFolder} />
      <TextEditor currentFolder={currentFolder} />
      <div className='mt-10'>
        {posts.length > 0
          ? posts.map((post) => (
              <div key={post.id.toString()}>
                <SavedEditors
                  val={post.snippet}
                  id={post.id}
                  editStarted={editStarted}
                  setEditStarted={setEditStarted}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default Home;
