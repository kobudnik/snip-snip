import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react';

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedSnips, setSelectedSnips] = useState([]);

  useEffect(() => {
    fetch('/api/folders')
      .then((res) => res.json())
      .then((folders) => {
        setFolders(folders);
      });
  }, []);
  const usePostFolder = async (folder_name) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder_name: 'messiah' }),
      };
      const postFolder = await fetch('/api/folders', requestOptions);
      const retrievedFolders = await postFolder.json();
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
      selectedSnips,
      setSelectedSnips,
      usePostFolder,
    }),
    [posts, folders, selectedSnips],
  );

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}
