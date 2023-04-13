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

  const useFiltered = useCallback(
    (ignoredFolder) =>
      Object.keys(folders).filter((name) => name !== ignoredFolder),
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
    }),
    [posts, folders, selectedSnips],
  );

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}
