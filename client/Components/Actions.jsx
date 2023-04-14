import React, { useCallback, useEffect, useState } from 'react';
import { useData } from '../Providers/DataProvider';
import { useParams } from 'react-router-dom';

const Actions = () => {
  const {
    useFiltered,
    selectedSnips,
    setPosts,
    setFolders,
    folders,
    updatedSnip,
    setUpdatedSnip,
  } = useData();

  const [action, setAction] = useState('');
  const [actionStatus, setActionStatus] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('');
  const [newFolder, setNewFolder] = useState('');

  const handleActionChange = (event) => {
    setAction(event.target.value);
  };

  const handlePostFolder = useCallback(
    async (folderName) => {
      try {
        const parsedName = folderName.replace(/[?]/g, '').trim();
        if (parsedName in folders) {
          throw new Error('Folder already exists');
        }
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ folderName: parsedName }),
        };
        const postFolder = await fetch('/api/folders', requestOptions);

        if (!postFolder.ok) throw new Error('An error occurred');

        const { name, id } = await postFolder.json();
        setFolders((prev) => ({ ...prev, [name]: id }));
        setActionStatus('Success!');
      } catch (e) {
        setActionStatus(e.message);
      }
    },
    [folders],
  );

  const handleSelectedFolder = (event) => {
    const selected =
      event.target.value === 'Home' ? 'default' : event.target.value;
    setSelectedFolder(selected);
  };

  const handleDeletedSnips = async () => {
    try {
      if (!selectedSnips.length) throw new Error('Please select snippets');
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ snipIDs: selectedSnips }),
      };
      const deleteSnips = await fetch('/api/snipped', requestOptions);
      if (!deleteSnips.ok) throw new Error('An error occurred.');

      const updatedList = await deleteSnips.json();
      setPosts(updatedList);
      setActionStatus('Success!');
    } catch (e) {
      setActionStatus(e.message);
    }
  };

  const handleMoveSnips = useCallback(
    async (selectedName) => {
      try {
        if (!selectedSnips.length) throw new Error('Please select snippets');
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            snipIDs: selectedSnips,
            newFolderID: folders[selectedName],
            folderID: folders[currentFolder],
          }),
        };
        const moveSnips = await fetch('/api/snipped', requestOptions);
        if (!moveSnips.ok) throw new Error('An error occurred');
        const updatedList = await moveSnips.json();
        setPosts(updatedList);
        setActionStatus('Success!');
      } catch (e) {
        setActionStatus(e.message);
      }
    },
    [selectedSnips, folders, currentFolder],
  );

  const handleUpdatedSnips = useCallback(
    async (snip) => {
      try {
        console.log(folders[currentFolder], 'handle update console log');
        if (!selectedSnips.length > 0)
          throw new Error('Please select a snippet');

        if (selectedSnips.length > 1) throw new Error('Select only one');
        if (updatedSnip.length < 4) throw new Error('Minimum 4 chars');
        const requestOptions = {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            snipID: snip,
            folderID: folders[currentFolder],
            newSnip: updatedSnip,
          }),
        };

        const updateSnip = await fetch('/api/snipped', requestOptions);
        if (!updateSnip.ok) throw new Error('An error occurred.');
        const updatedList = await updateSnip.json();
        setPosts(updatedList);
        setActionStatus('Success!');
        setUpdatedSnip('');
      } catch (e) {
        setActionStatus(e.message);
      }
    },
    [updatedSnip, selectedSnips],
  );

  const handleFocus = (e) => {
    e.target.placeholder = '';
  };

  const handleBlur = (e) => {
    e.target.placeholder = e.target.name;
  };

  const handleFolderChange = (e) => {
    setNewFolder(e.target.value);
  };

  const postMethods = {
    ADD: () => {
      handlePostFolder(newFolder);
      setAction('');
      setNewFolder('');
    },
    DELETE: () => {
      handleDeletedSnips(selectedSnips);
      setAction('');
    },

    MOVE: () => {
      handleMoveSnips(selectedFolder);
      setAction('');
      setSelectedFolder('');
    },
    UPDATE: () => {
      handleUpdatedSnips(selectedSnips[0]);
      setAction('');
    },
  };

  const { currentFolder } = useParams();

  const folderInput = (
    <input
      type='text'
      placeholder='folder name'
      className='rounded-3xl py-3 w-48 text-center outline-none'
      aria-label='login-username-input'
      name='folderName'
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleFolderChange}
      value={newFolder}
    />
  );

  const availableFolders = useFiltered(currentFolder);

  const folderSelect = (
    <>
      <label
        htmlFor='folder-selector'
        className='block font-medium text-yellow-500'
      >
        Select a folder:
      </label>
      <select
        id='folder-selector'
        className='focus:outline-none text-lg bg-gray-50 text-center border border-gray-300 text-gray-900 rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white '
        onChange={handleSelectedFolder}
        value={selectedFolder}
      >
        <option value=''>Choose from below</option>
        {availableFolders.map((folderName, i) => {
          return (
            <option
              value={folderName}
              id={folders[folderName]}
              key={folders[folderName]}
            >
              {folderName === 'default' ? 'Home' : folderName}
            </option>
          );
        })}
      </select>
    </>
  );

  const submitButton = (
    <button
      data-te-ripple-init
      data-te-ripple-color='light'
      className={`w-40 px-6 block py-4 text-sm font-medium text-center rounded text-white ${
        action === 'DELETE'
          ? 'bg-red-600 hover:bg-red-500'
          : 'bg-green-700 hover:bg-green-600'
      } mt-4`}
      onClick={() => postMethods[action]()}
    >
      {action}
    </button>
  );

  useEffect(() => {
    let timeoutId;
    if (actionStatus) {
      timeoutId = setTimeout(() => {
        setActionStatus('');
      }, 2000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [actionStatus]);

  return (
    <div className='right-24 fixed top-1/4'>
      <div className='flex flex-col items-center'>
        <select
          id='action-selector'
          className='focus:outline-none mb-4 text-lg bg-gray-50 text-center border border-gray-300 text-gray-900 rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white '
          onChange={handleActionChange}
          value={action}
        >
          <option value=''>Select an option</option>
          <option value='ADD'>Create folder</option>
          <option value='MOVE'>Move snippet</option>
          <option value='DELETE'>Delete snippet</option>
          <option value='UPDATE'>Update snippet</option>
        </select>
        <div>
          {action === 'ADD' && folderInput}

          {action === 'MOVE' && folderSelect}
        </div>
        {action && submitButton}
        <i
          className={`${
            actionStatus === 'Success!' ? 'text-green-800' : 'text-red-700'
          } text-2xl font-extrabold `}
        >
          {actionStatus}
        </i>
      </div>
    </div>
  );
};

export default Actions;
