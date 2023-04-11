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
  const [folders, setFolders] = useState({});
  const [selected_snips, setSelected] = useState([]);

  // useEffect(() => {
  //   fetch('/api/folders')
  //     .then((res) => res.json())
  //     .then((all_folders) => {
  //       if (all_folders.length) {
  //         const folderObj = {};
  //         all_folders.forEach(({ name, id }) => (folderObj[name] = id));
  //         setFolders(folderObj);
  //         console.log(folders, 'these are the folders');
  //       }
  //     });
  // }, []);

  const usePostFolder = useCallback(
    async (folder_name) => {
      try {
        const parsed_name = folder_name.replace(/[?]/g, '').trim();
        if (parsed_name in folders) throw { message: 'Folder already exists' };
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ folder_name: parsed_name }),
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
    async (folder_id) => {
      try {
        const requestOptions = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ folder_id }),
        };
        const postFolder = await fetch('/api/folders', requestOptions);
        if (!postFolder.ok) throw { message: 'Problem deleting your folder' };
        const updated_list = await postFolder.json();
        const new_folders_list = {};
        updated_list.forEach(
          ({ name: folder_name, id: folder_id }) =>
            (new_folders_list[folder_name] = folder_id),
        );

        setFolders(new_folders_list);
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
      selected_snips,
      setSelected,
      usePostFolder,
      useFiltered,
      handleDeleteFolder,
    }),
    [posts, folders, selected_snips],
  );

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}
