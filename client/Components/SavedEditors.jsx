import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { useData } from '../Providers/DataProvider';

const SavedEditors = ({ val, id }) => {
  const [readOnly, setReadOnly] = useState(true);

  const { selectedSnips, setSelected, setUpdatedSnip } = useData();

  const handleUpdate = (value) => {
    setUpdatedSnip(value);
  };

  const handleEdit = (e) => {
    setReadOnly(!readOnly);
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
    };
  }, []);

  return (
    <div id='editor-container' className='flex justify-center ml-6 mb-5'>
      <button onClick={handleEdit}>Edit</button>
      {editor}
      <input
        type='checkbox'
        className='checkbox self-center bg-gray-300 ml-2 '
        id={id}
        onChange={handleCheckboxChange}
      ></input>
    </div>
  );
};

export default SavedEditors;
