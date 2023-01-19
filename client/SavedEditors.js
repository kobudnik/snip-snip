import React, { useRef, useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';

const SavedEditors = (props) => {
  const editor = (
    <CodeMirror
      id={props.savedID}
      value={props.val}
      height='400px'
      width='50vw'
      extensions={[javascript({ jsx: true })]}
      theme={dracula}
      placeholder='Give me your code.'
      readOnly='true'
    />
  );
  return <div>{editor}</div>;
};

export default SavedEditors;
