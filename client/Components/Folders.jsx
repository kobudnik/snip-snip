import React, { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import { useData } from '../Providers/DataProvider.jsx';

const Folders = ({ currentFolder }) => {
  const { folders } = useData();
  const allFolders = useMemo(() => {
    return folders.length ? folders.map((folder) => folder.name) : null;
  }, [folders]);

  const filteredFolders = useCallback(
    (ignoredFolder) => allFolders.filter((name) => name !== ignoredFolder),
    [allFolders],
  );

  return (
    <div id='folder-container' className='bg-yellow-300 w-1/5'>
      {allFolders &&
        filteredFolders(currentFolder).map((folderName) => (
          <Link
            to={`../${folderName}`}
            key={uuidV4()}
            className='underline hover:text-gray-300 text-lg'
          >
            {folderName}
          </Link>
        ))}
    </div>
  );
};

export default Folders;
