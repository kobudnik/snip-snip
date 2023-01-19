import React, { useRef, useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';

const TextEditor = () => {
  const onChange = React.useCallback((value, viewUpdate) => {
    console.log('value:', value);
  }, []);
  return (
    <div className='textBox'>
      <CodeMirror
        value="console.log('hello world!');"
        height='200px'
        width='50vw'
        extensions={[javascript({ jsx: true })]}
        theme={dracula}
        onChange={onChange}
      />
    </div>
  );
};
export default TextEditor;
