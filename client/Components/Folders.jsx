import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import { useData } from '../Providers/DataProvider.jsx';

const Folders = ({ currentFolder }) => {
  const { folders } = useData();

  const filteredFolders = useCallback(
    (ignoredFolder) =>
      folders.filter((folder) => folder.name !== ignoredFolder),
    [folders],
  );

  return (
    <div id='folder-container' className='w-1/5 mt-60 fixed font-poppins'>
      <div className='flex flex-col items-center'>
        {folders.length > 1 && (
          <span className='text-xl font-bold mb-2'>Your folders:</span>
        )}
        {folders.length > 0 &&
          filteredFolders(currentFolder).map(({ name, id }) => (
            <div>
              <Link
                to={`../${name}`}
                key={uuidV4()}
                className='text-orange-800 hover:text-gray-500 text-lg no-underline hover:underline inline-block mb-4'
              >
                {name === 'default' ? 'Home' : name}
              </Link>
              &nbsp;
              {name === 'default' ? null : (
                <button id={id} className='text-sm hover:underline'>
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
