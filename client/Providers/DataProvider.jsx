import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react';

import { Outlet } from 'react-router-dom';

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [posts, setPosts] = useState('');
  const [folders, setFolders] = useState(false);
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    fetch('/api/folders')
      .then((res) => res.json())
      .then((folders) => {
        setFolders(folders);
      });
  }, []);
  const usePostFolder = async (folderName) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folderName: 'josiah' }),
      };
      const postFolder = await fetch('/api/folders', requestOptions);
      const retrievedFolders = await postFolder.json();
      console.log(folders, 'in folders callback');
      setFolders([...folders, retrievedFolders]);
    } catch (e) {
      console.log('error adding folder in texteditor', e.message);
    }
  };

  const data = useMemo(
    () => ({
      posts,
      setPosts,
      folders,
      setFolders,
      selection,
      setSelection,
      usePostFolder,
    }),
    [posts, folders, selection],
  );

  return (
    <DataContext.Provider value={data}>
      <Outlet />
    </DataContext.Provider>
  );
}
