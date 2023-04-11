import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import { useData } from '../Providers/DataProvider.jsx';

const Folders = ({ current_folder }) => {
  const { folders, setFolders, useFiltered, handleDeleteFolder } = useData();

  useEffect(() => {
    fetch('/api/folders/')
      .then((res) => res.json())
      .then((all_folders) => {
        if (all_folders.length) {
          const folderObj = {};
          all_folders.forEach(({ name, id }) => (folderObj[name] = id));
          setFolders(folderObj);
          console.log(folderObj, 'these are the folders');
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
          useFiltered(current_folder).map((name) => (
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
