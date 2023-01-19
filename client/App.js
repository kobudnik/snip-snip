import React from 'react';
import Header from './Header';
import TextEditor from './TextEditor';
import './index.css';

const App = () => {
  console.log('hey');
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => {
        console.log('this is the data response from the api: ', data);
        setData(data.Hello);
      });
  }, []);

  return (
    <>
      <Header />
      <TextEditor />
    </>
  );
  //<p>{!data ? 'Loading...' : data}</p>;
};

export default App;
