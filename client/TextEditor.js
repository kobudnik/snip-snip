import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import SavedEditors from './SavedEditors';

const TextEditor = (props) => {
  const editor = (
    <CodeMirror
      id='instance'
      value={props.snipState}
      height='200px'
      width='50vw'
      extensions={[javascript({ jsx: true })]}
      theme={dracula}
      placeholder='Give me your code.'
      onChange={props.change}
    />
  );

  return (
    <div className='textBox'>
      {editor}
      <button onClick={props.postSnippet}>Save Snippet</button>
      <button onClick={props.reset}>Reset</button>

      {props.posts &&
        props.posts.map((post, i) => (
          <SavedEditors savedID={i} val={post.snippet}></SavedEditors>
        ))}
    </div>
  );
};
export default TextEditor;
