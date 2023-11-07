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
  const [size, setSize] = useState('medium');
  const [width, setWidth] = useState('50vw');
  const [height, setHeight] = useState('35vh');

  useEffect(() => {
    if (size === 'small') {
      setWidth('45vw');
      setHeight('25vh');
    } else if (size === 'medium') {
      setWidth('50vw');
      setHeight('35vh');
    } else if (size === 'large') {
      setWidth('55vw');
      setHeight('40vh');
    }
  }, [size]);

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
  }, [folders, currentFolder]);

  return (
    <div className='bg-gray-900 grow mt-20 flex flex-col '>
      <Folders currentFolder={currentFolder} />
      <TextEditor currentFolder={currentFolder} height={height} width={width} />
      {posts.length > 0 && (
        <div className='w-40 fixed bottom-0'>
          <span className='block'>View:</span>
          <select onChange={(e) => setSize(e.target.value)} value={size}>
            <option value='small'>Small</option>
            <option value='medium'>Medium</option>
            <option value='large'>Large</option>
          </select>
        </div>
      )}
      <div className='mt-10'>
        {posts.length > 0
          ? posts.map((post) => (
              <div key={post.id.toString()}>
                <SavedEditors
                  val={post.snippet}
                  id={post.id}
                  editStarted={editStarted}
                  setEditStarted={setEditStarted}
                  height={height}
                  width={width}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default Home;
