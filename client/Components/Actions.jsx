import React from 'react';
import { useData } from '../Providers/DataProvider';

const Actions = () => {
  const { usePostFolder } = useData();
  return (
    <div className='right-24 fixed top-1/4'>
      <select
        id='actions'
        className='focus:outline-none text-lg bg-gray-50 text-center border border-gray-300 text-gray-900 rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white '
      >
        <option value=''>Select an option</option>
        <option value='PUT'>Move snippet</option>

        <option value='DELETE'>Delete</option>
      </select>
      <button
        data-te-ripple-init
        data-te-ripple-color='light'
        className='w-40 px-6 block
  py-2 text-sm font-medium text-center rounded text-white bg-green-700
  hover:bg-green-600'
        onClick={usePostFolder}
      >
        Submit
      </button>
    </div>
  );
};

export default Actions;
