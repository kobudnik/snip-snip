import React from 'react';

const SavedEditors = (props) => {
  const editor = (
    <CodeMirror
      id={props.savedID}
      value={snipState}
      height='200px'
      width='50vw'
      extensions={[javascript({ jsx: true })]}
      theme={dracula}
      placeholder='Give me your code.'
      readOnly='true'
    />
  );
  return <div>editor</div>;
};

export default SavedEditors;
