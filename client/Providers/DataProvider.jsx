import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
  useCallback,
} from 'react';

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [folders, setFolders] = useState([]);
  const [availableFolders, setAvailable] = useState([]);
  const [selectedSnips, setSelectedSnips] = useState([]);

  useEffect(() => {
    fetch('/api/folders')
      .then((res) => res.json())
      .then((folders) => {
        setFolders(folders);
        console.log(folders, 'these are the folders');
      });
  }, []);

  const usePostFolder = useCallback(
    async (folder_name) => {
      try {
        const parsed_name = folder_name.replace(/[?]/g, '').trim();
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ folder_name: parsed_name }),
        };
        const postFolder = await fetch('/api/folders', requestOptions);
        const retrievedFolders = await postFolder.json();
        setFolders([...folders, retrievedFolders]);
      } catch (e) {
        console.log('error adding folder in texteditor', e.message);
      }
    },
    [folders],
  );

  const useFiltered = useCallback(
    (ignoredFolder) =>
      folders.filter((folder) => folder.name !== ignoredFolder),
    [folders],
  );

  const data = useMemo(
    () => ({
      posts,
      setPosts,
      folders,

      setFolders,

      availableFolders,
      setAvailable,
      selectedSnips,
      setSelectedSnips,
      usePostFolder,
      useFiltered,
    }),
    [posts, folders, selectedSnips],
  );

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}
