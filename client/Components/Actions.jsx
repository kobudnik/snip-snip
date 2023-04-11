import React, { useState } from 'react';
import { useData } from '../Providers/DataProvider';
import { useParams } from 'react-router-dom';

const Actions = () => {
  const {
    usePostFolder,
    useFiltered,
    selected_snips,
    posts,
    setPosts,
    folders,
  } = useData();
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
        body: JSON.stringify({ snip_ids: selected_snips }),
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
    DELETE: () => {
      handleDeletedSnips(selected_snips);
      setAction('');
    },
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
      className='rounded-3xl py-3 w-48 text-center outline-none'
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
        className='block font-medium text-yellow-500'
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
          available_folders.map((folder_name) => {
            return (
              <option
                value={folder_name}
                id={folders[folder_name]}
                key={folders[folder_name]}
              >
                {folder_name}
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
py-4 text-sm font-medium text-center rounded text-white bg-green-800
hover:bg-green-700 mt-4'
      onClick={() => postMethods[action]()}
    >
      Submit
    </button>
  );

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
          <option value='ADD'>Create Folder</option>
          <option value='MOVE'>Move snippet</option>
          <option value='DELETE'>Delete snippet</option>
        </select>
        <div>
          {action === 'ADD' && folder_input}

          {action === 'MOVE' && folder_select}
        </div>
        {action && submitButton}
      </div>
    </div>
  );
};

export default Actions;
