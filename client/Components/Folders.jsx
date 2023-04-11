import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import { useData } from '../Providers/DataProvider.jsx';

const Folders = ({ currentFolder }) => {
  const { folders, setFolders, useFiltered, handleDeleteFolder } = useData();

  useEffect(() => {
    fetch('/api/folders/')
      .then((res) => res.json())
      .then((allFolders) => {
        if (allFolders.length) {
          const folderObj = {};
          allFolders.forEach(
            ({ name, id }) =>
              (folderObj[name === 'Home' ? 'default' : name] = id),
          );
          setFolders(folderObj);
        }
      });
  }, []);

  return (
    <div id='folder-container' className='w-1/5 mt-60 fixed font-poppins'>
      <div className='flex flex-col items-center h-80  overflow-y-scroll'>
        {folders.default && (
          <span className='text-xl font-bold mb-2'>Your folders:</span>
        )}
        {folders.default &&
          useFiltered(currentFolder).map((name) => (
            <div key={uuidV4()}>
              <Link
                to={`../${name}`}
                className='text-orange-800 hover:text-gray-500 text-lg no-underline hover:underline inline-block mb-4'
              >
                {name === 'default' ? 'Home' : name}
              </Link>
              &nbsp;
              {name === 'default' ? null : (
                <button
                  id={folders[name]}
                  className='text-sm hover:underline'
                  onClick={(e) => handleDeleteFolder(Number(e.target.id))}
                >
                  {' '}
                  &#10005;
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Folders;
