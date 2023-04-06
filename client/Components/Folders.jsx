import React, { useMemo, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import { useData } from '../ContextProviders/DataProvider.jsx';

const Folders = ({ currentFolder }) => {
  const { folders, setFolders } = useData();
  console.log(folders, 'these are the folders');
  const allFolders = useMemo(() => {
    return folders.length ? folders.map((folder) => folder.name) : null;
  }, [folders]);

  const filteredFolders = useCallback(
    (ignoredFolder) => allFolders.filter((name) => name !== ignoredFolder),
    [folders],
  );

  return (
    <div className='folder-container'>
      {allFolders &&
        filteredFolders(currentFolder).map((folderName) => (
          <Link to={folderName} key={uuidV4()}>
            {folderName}
          </Link>
        ))}
    </div>
  );
};

export default Folders;
