import { useState, useEffect } from 'react';
import './App.css'
import CategorySection from './components/CategorySection';
import GallerySection from './components/GallerySection';

function App() {
  const [folders, setFolders] = useState(new Map());
  const [selectedFolder, setSelectedFolder] = useState("All");
  useEffect(() => { getFolders(setFolders); }, []);

  return (
    <>
      <header>
        <p>Website Name 3D Models</p>
      </header>
      <CategorySection folders={folders} selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} />
      <GallerySection folders={folders} selectedFolder={selectedFolder} />
    </>
  )
}

async function getFolders(setFolders) {
  const foldersJson = await getFilesUsingId("1e6KT-ONRiz90G_hqhdgOnLyhV80Phqf_");

  const newFolders = new Map();
  newFolders.set("All", { id: "all", files: {} });

  const folderData = await Promise.all(
    foldersJson.map(async (file) => [
      file.name,
      { id: file.id, files: await getFilesUsingId(file.id, "createdTime desc") },
    ])
  );

  folderData.forEach(([name, data]) => newFolders.set(name, data));

  setFolders(newFolders);
}

async function getFilesUsingId(id, orderBy = "name") {
  const url = `https://www.googleapis.com/drive/v3/files?key=AIzaSyCVDk734Nt4kQpEAO7vbsdwu73qQtA1iXw&q=%27${id}%27+in+parents&fields=files(id,name)&orderBy=${orderBy}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.files;
}

export default App
