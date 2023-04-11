import React from 'react';
import { useData } from '../Providers/DataProvider.jsx';

const ConfirmationModal = ({ setShow, folderID, handleDeleteFolder }) => {
  const { folders } = useData();

  const handleDelete = () => {
    handleDeleteFolder(folderID);
    setShow(false);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className='z-[10000] inset-0 absolute t-[50%] r-[50%] bg-gray-700 bg-opacity-0 flex items-center justify-center'>
      <div className='bg-white rounded-md shadow-md p-4'>
        <p className='mb-4'>Are you sure you want to delete this folder?</p>
        <p className='mb-4'>Doing so will delete all snippets inside.</p>
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
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
