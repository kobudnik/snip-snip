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

  const usePostFolder = useCallback(
    async (folderName) => {
      try {
        const parsedName = folderName.replace(/[?]/g, '').trim();
        if (parsedName in folders) throw { message: 'Folder already exists' };
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ folderName: parsedName }),
        };
        const postFolder = await fetch('/api/folders', requestOptions);
        const { name, id } = await postFolder.json();
        setFolders((prev) => ({ ...prev, [name]: id }));
      } catch (e) {
        console.log('error adding folder in texteditor', e.message);
      }
    },
    [folders],
  );

  const handleDeleteFolder = useCallback(
    async (folderID) => {
      try {
        const requestOptions = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ folderID }),
        };
        const postFolder = await fetch('/api/folders', requestOptions);
        if (!postFolder.ok) throw { message: 'Problem deleting your folder' };
        const updatedList = await postFolder.json();
        const newFolderList = {};
        updatedList.forEach(
          ({ name: folderName, id: folderID }) =>
            (newFolderList[folderName] = folderID),
        );

        setFolders(newFolderList);
      } catch (e) {
        console.log('error adding folder in texteditor', e.message);
      }
    },
    [folders],
  );

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
      usePostFolder,
      useFiltered,
      handleDeleteFolder,
    }),
    [posts, folders, selectedSnips],
  );

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}
