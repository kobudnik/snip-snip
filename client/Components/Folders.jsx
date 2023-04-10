import React, { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import { useData } from '../Providers/DataProvider.jsx';
import scissorsImage from '../Images/scissors.png';

const Folders = ({ currentFolder }) => {
  const { folders } = useData();
  const allFolders = useMemo(() => {
    return folders.length ? folders.map((folder) => folder.name) : [];
  }, [folders]);

  const filteredFolders = useCallback(
    (ignoredFolder) => allFolders.filter((name) => name !== ignoredFolder),
    [allFolders],
  );

  return (
    <div id='folder-container' className='w-1/5 mt-60 fixed font-poppins'>
      <div className='flex flex-col items-center'>
        {allFolders.length > 1 && (
          <span className='text-xl font-bold mb-2'>Your folders:</span>
        )}
        {allFolders.length > 0 &&
          filteredFolders(currentFolder).map((folderName) => (
            <Link
              to={`../${folderName}`}
              key={uuidV4()}
              className='underline text-orange-800 hover:text-gray-500 text-lg inline-block mb-4'
            >
              {folderName === 'default' ? 'Home' : folderName}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Folders;
