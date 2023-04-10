import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { useData } from '../Providers/DataProvider';

const SavedEditors = ({ val, id }) => {
  const editor = (
    <CodeMirror
      value={val}
      height='35vh'
      width='50vw'
      extensions={[javascript({ jsx: true })]}
      theme={dracula}
      placeholder='Give me your code.'
      readOnly='true'
    />
  );

  const { selectedSnips, setSelectedSnips } = useData();

  const handleCheckboxChange = (event) => {
    const checkboxId = Number(event.target.id);
    if (event.target.checked) {
      setSelectedSnips([...selectedSnips, checkboxId]);
    } else {
      setSelectedSnips(selectedSnips.filter((snip) => snip !== checkboxId));
    }
  };
  return (
    <div id='editor-container' className='flex justify-center ml-5 mb-5'>
      {editor}
      <input
        type='checkbox'
        className='checkbox self-center bg-gray-300 ml-1 '
        id={id}
        onChange={handleCheckboxChange}
      ></input>
    </div>
  );
};

export default SavedEditors;
