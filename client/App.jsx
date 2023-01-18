import React from 'react';

const App = () => {
  console.log('hey');
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return <p>{!data ? 'Loading...' : data}</p>;
};

export default App;
