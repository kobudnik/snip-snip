import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useCallback,
} from 'react';

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [folders, setFolders] = useState({});
  const [selectedSnips, setSelected] = useState([]);
  const [updatedSnip, setUpdatedSnip] = useState('');

  const useFiltered = useCallback(
    (ignoredFolder) =>
      Object.keys(folders)
        .filter((name) => name !== ignoredFolder)
        .sort((a, b) => {
          const keyA = a.toLowerCase();
          const keyB = b.toLowerCase();
          if (keyA === 'home') return -5;
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        }),
    [folders],
  );

  const data = useMemo(
    () => ({
      posts,
      setPosts,
      folders,
      setFolders,
      selectedSnips,
      setSelected,
      useFiltered,
      updatedSnip,
      setUpdatedSnip,
    }),
    [posts, folders, selectedSnips, updatedSnip, useFiltered],
  );

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}
