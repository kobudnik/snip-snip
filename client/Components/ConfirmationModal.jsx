import React from 'react';
import { useData } from '../Providers/DataProvider.jsx';

const ConfirmationModal = ({ setShow, deleteName, handleDeleteFolder }) => {
  const { folders } = useData();

  const handleDelete = () => {
    handleDeleteFolder(folders[deleteName]);
    setShow(false);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className='z-[10000] inset-0 absolute b-0 bg-gray-700 bg-opacity-0 flex items-center justify-center '>
      <div
        className='bg-white rounded-md shadow-md p-6 text-center flex flex-col items-center justify-center'
        style={{ alignItems: 'flex-start' }}
      >
        <p className='p-5'>
          Deleting "{deleteName}" will remove all snips inside.
        </p>

        <div className='flex justify-end'>
          <button
            className='bg-gray-200 rounded-md px-4 py-2 mr-2'
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className='bg-red-500 text-white rounded-md px-4 py-2'
            onClick={handleDelete}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
