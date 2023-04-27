import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import { useData } from '../Providers/DataProvider';
import ConfirmationModal from './ConfirmationModal';

// eslint-disable-next-line react/prop-types
function Folders({ currentFolder }) {
  const { folders, setFolders, useFiltered } = useData();

  const [showModal, setShow] = useState(false);
  const [deleteName, setDelete] = useState(0);

  const handleDeleteFolder = async (folderID) => {
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folderID }),
      };
      const postFolder = await fetch('/api/folders', requestOptions);
      if (!postFolder.ok) throw new Error('Problem deleting your folder');
      const updatedList = await postFolder.json();
      const newFolderList = {};
      // eslint-disable-next-line no-shadow
      updatedList.forEach(({ name: folderName, id: folderID }) => {
        newFolderList[folderName === 'default' ? 'home' : folderName] =
          folderID;
      });

      setFolders(newFolderList);
    } catch (e) {
      console.log('error adding folder in texteditor', e.message);
    }
  };

  useEffect(() => {
    fetch('/api/folders/')
      .then((res) => res.json())
      .then((allFolders) => {
        if (allFolders.length) {
          const folderObj = {};
          allFolders.forEach(({ name, id }) => {
            folderObj[name === 'default' ? 'home' : name] = id;
          });
          setFolders(folderObj);
        }
      });
  }, [setFolders]);

  return (
    <>
      <div id='folder-container' className='w-1/5 pt-60 fixed font-poppins'>
        <div className='flex flex-col items-center h-80  overflow-y-scroll'>
          <span className='text-xl font-bold pb-2'>Your folders:</span>

          {useFiltered(currentFolder).map((name) => (
            <div className='relative' key={uuidV4()}>
              <Link
                to={`../${name}`}
                className='text-yellow-500 hover:text-gray-500 text-lg no-underline hover:underline inline-block pb-3 pt-1'
              >
                {name === 'home' ? 'Home' : name}
              </Link>
              &nbsp;
              {name === 'home' ? null : (
                <button
                  id={folders[name]}
                  type='button'
                  className='text-sm hover:underline'
                  onClick={() => {
                    setDelete(name);
                    setShow(true);
                  }}
                >
                  {' '}
                  &#10005;
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
        {showModal && (
          <ConfirmationModal
            setShow={setShow}
            deleteName={deleteName}
            handleDeleteFolder={handleDeleteFolder}
          />
        )}
      </div>
    </>
  );
}

export default Folders;
