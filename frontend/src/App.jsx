import { useState, useEffect } from 'react';
import './App.css'
import CategorySection from './components/CategorySection';
import GallerySection from './components/GallerySection';

function App() {
  const [folders, setFolders] = useState(new Map());
  const [selectedFolder, setSelectedFolder] = useState("");
  useEffect(() => { getFolders(setFolders); }, []);
  useEffect(() => {
    const folder = folders.get(selectedFolder);
    if (!folder || folder.files !== null) return;

    getFilesUsingId(folder.id).then((files) => {
      setFolders((currentFolders) => {
        const nextFolders = new Map(currentFolders);
        nextFolders.set(selectedFolder, { ...folder, files });
        return nextFolders;
      });
    });
  }, [folders, selectedFolder]);

  return (
    <>
      <header>
        <p>Yash's 3D Models</p>
      </header>
      <CategorySection folders={folders} selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} />
      <GallerySection folders={folders} selectedFolder={selectedFolder} />
    </>
  )
}

async function getFolders(setFolders) {
  const response = await fetch("/api/folders");
  if (!response.ok) throw new Error(`Folder request failed: ${response.status}`);
  const foldersJson = await response.json();

  const newFolders = new Map();

  const folderData = foldersJson.map((file) => [
    file.name,
    { id: file.id, files: null },
  ]);

  folderData.forEach(([name, data]) => newFolders.set(name, data));

  setFolders(newFolders);
}

async function getFilesUsingId(id) {
  const response = await fetch(`/api/folders/${encodeURIComponent(id)}/files`);
  if (!response.ok) throw new Error(`File request failed: ${response.status}`);
  return response.json();
}

export default App
