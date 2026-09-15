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

    getFilesUsingId(folder.id, "createdTime desc", true).then((files) => {
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
  const foldersJson = await getFilesUsingId("1e6KT-ONRiz90G_hqhdgOnLyhV80Phqf_");

  const newFolders = new Map();

  const folderData = foldersJson.map((file) => [
    file.name,
    { id: file.id, files: null },
  ]);

  folderData.forEach(([name, data]) => newFolders.set(name, data));

  setFolders(newFolders);
}

const filesRequestCache = new Map();

async function getFilesUsingId(id, orderBy = "name", imagesOnly = false) {
  const cacheKey = `${id}:${orderBy}:${imagesOnly}`;
  if (filesRequestCache.has(cacheKey)) return filesRequestCache.get(cacheKey);

  const url = `https://www.googleapis.com/drive/v3/files?key=AIzaSyCVDk734Nt4kQpEAO7vbsdwu73qQtA1iXw&q=%27${id}%27+in+parents&fields=files(id,name,mimeType)&orderBy=${orderBy}`;
  const request = fetch(url).then(async (response) => {
    if (!response.ok) throw new Error(`Google Drive request failed: ${response.status}`);
    const data = await response.json();
    return imagesOnly
      ? data.files.filter((file) => file.mimeType.startsWith("image"))
      : data.files;
  });

  filesRequestCache.set(cacheKey, request);
  return request;
}

export default App
