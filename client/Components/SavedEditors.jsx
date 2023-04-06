import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { useData } from '../Providers/DataProvider';

const SavedEditors = ({ val, inputID }) => {
  const editor = (
    <CodeMirror
      value={val}
      height='200px'
      width='50vw'
      extensions={[javascript({ jsx: true })]}
      theme={dracula}
      placeholder='Give me your code.'
      readOnly='true'
    />
  );

  const { selectedSnips, setSelectedSnips } = useData();

  const handleCheckboxChange = (event) => {
    const checkboxId = event.target.id;
    console.log(selectedSnips);
    if (event.target.checked) {
      setSelectedSnips([...selectedSnips, checkboxId]);
    } else {
      setSelectedSnips(
        selectedSnips
          .filter((snip) => snip.id !== checkboxId)
          .map((snips) => snips.id),
      );
    }
    console.log(selectedSnips);
  };
  return (
    <div className='editor-container'>
      {editor}
      <input
        type='checkbox'
        className='checkbox'
        id={inputID}
        onChange={handleCheckboxChange}
      ></input>
    </div>
  );
};

export default SavedEditors;
