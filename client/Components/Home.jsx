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
  const [width, setWidth] = useState('50vw');
  const [height, setHeight] = useState('35vh');

  const handleResize = (event) => {
    const selectedDimension = event.target.value;
    if (selectedDimension === 'medium') {
      setWidth('50vw');
      setHeight('35vh');
    } else if (selectedDimension === 'large') {
      setWidth('60vw');
      setHeight('40vh');
    }
  };

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
      <select onChange={handleResize}>
        <option value='medium'>Medium</option>
        <option value='large'>Large</option>
      </select>
      <TextEditor currentFolder={currentFolder} height={height} width={width} />
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
