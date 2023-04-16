import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { useData } from '../Providers/DataProvider';

const SavedEditors = ({ val, id, editStarted, setEditStarted }) => {
  const [readOnly, setReadOnly] = useState(true);

  const { selectedSnips, setSelected, setUpdatedSnip } = useData();

  const handleUpdate = (value) => {
    setUpdatedSnip(value);
  };

  const handleEdit = (e) => {
    if (editStarted && readOnly === true) return;
    else if (editStarted) {
      setReadOnly(true);
      setEditStarted(false);
      setUpdatedSnip('');
    } else {
      setReadOnly(false);
      setEditStarted(true);
    }
  };

  const editor = (
    <CodeMirror
      value={val}
      height='35vh'
      width='50vw'
      extensions={[javascript({ jsx: true })]}
      theme={dracula}
      placeholder='Give me your code.'
      readOnly={readOnly}
      onChange={handleUpdate}
    />
  );

  const handleCheckboxChange = (event) => {
    const checkboxId = Number(event.target.id);
    if (event.target.checked) {
      setSelected([...selectedSnips, checkboxId]);
    } else {
      setSelected(selectedSnips.filter((snip) => snip !== checkboxId));
    }
  };

  useEffect(() => {
    return () => {
      setSelected([]);
      setEditStarted(false);
    };
  }, []);

  return (
    <div id='editor-container' className='flex justify-center ml-8 mb-5 '>
      <div
        className={` ${
          readOnly ? 'border-none' : 'border-solid border-2 border-sky-500 '
        } ml-4`}
      >
        {editor}
      </div>
      <div className='flex flex-col items justify-center self-center'>
        <input
          type='checkbox'
          className='checkbox self-center bg-gray-300 ml-2 '
          id={id}
          onChange={handleCheckboxChange}
        ></input>
        <button
          className='rounded-md p-2 ml-3 mt-4 h-10  text-xl hover:text-blue-300 '
          onClick={handleEdit}
        >
          <span>&#9998;</span>
        </button>
      </div>
    </div>
  );
};

export default SavedEditors;
