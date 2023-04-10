import React, { useState } from 'react';
import { useData } from '../Providers/DataProvider';
import { useParams } from 'react-router-dom';

const Actions = () => {
  const { usePostFolder, useFiltered, selectedSnips, posts, setPosts } =
    useData();
  const [action, setAction] = useState('');
  const [chosen_folder, setChosen] = useState(0);
  const [new_folder, setNew] = useState('');

  const handleActionChange = (event) => {
    setAction(event.target.value);
    console.log(action);
  };

  const handleSelectedFolder = (event) => {
    setChosen(event.target.value);
    console.log(action);
  };

  const handleDeletedSnips = async (event) => {
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ snip_ids: selectedSnips }),
      };
      const deleteSnips = await fetch('/api/snipped', requestOptions);
      if (!deleteSnips.ok) {
        throw { message: 'Unable to delete snippets' };
      }
      const updated_list = await deleteSnips.json();
      console.log('this is the updated list');
      setPosts(updated_list);
    } catch (e) {
      console.log('error deleting snippets in texteditor', e.message);
    }
  };

  const { current_folder } = useParams();

  const postMethods = {
    ADD: () => {
      usePostFolder(new_folder);
      setAction('');
    },
    DELETE: () => handleDeletedSnips(selectedSnips),
  };

  const available_folders = useFiltered(current_folder);

  const handleFocus = (e) => {
    e.target.placeholder = '';
  };

  const handleBlur = (e) => {
    e.target.placeholder = e.target.name;
  };

  const handleFolderChange = (e) => {
    setNew(e.target.value);
  };

  const folder_input = (
    <input
      type='text'
      placeholder='folder name'
      className='rounded-3xl py-3 my-4 w-48 text-center outline-none'
      aria-label='login-username-input'
      name='folder_name'
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleFolderChange}
      value={new_folder}
    />
  );

  const folder_select = (
    <>
      <label
        htmlFor='folder-selector'
        className='block font-medium text-gray-700'
      >
        Select a folder:
      </label>
      <select
        id='folder-selector'
        className='focus:outline-none text-lg bg-gray-50 text-center border border-gray-300 text-gray-900 rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white '
        onChange={handleSelectedFolder}
        value={chosen_folder}
      >
        {available_folders.length > 0 &&
          available_folders.map((folder) => {
            return (
              <option value={folder.name} id={folder.id} key={folder.id}>
                {folder.name}
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
      className='w-40 px-6 block
py-2 text-sm font-medium text-center rounded text-white bg-green-700
hover:bg-green-600'
      onClick={() => postMethods[action]()}
    >
      Submit
    </button>
  );

  return (
    <div className='right-24 fixed top-1/4'>
      <select
        id='action-selector'
        className='focus:outline-none text-lg bg-gray-50 text-center border border-gray-300 text-gray-900 rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white '
        onChange={handleActionChange}
        value={action}
      >
        <option value=''>Select an option</option>
        <option value='ADD'>Create Folder</option>
        <option value='MOVE'>Move snippet</option>
        <option value='DELETE'>Delete</option>
      </select>
      <div>
        {action === 'ADD' && folder_input}

        {action === 'MOVE' && folder_select}

        {action === 'DELETE' && folder_select}
      </div>
      {action && submitButton}
    </div>
  );
};

export default Actions;
