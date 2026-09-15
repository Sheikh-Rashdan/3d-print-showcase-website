import { useState, useEffect } from 'react';
import './App.css'
import CategorySection from './components/CategorySection';

function App() {
  const [folders, setFolders] = useState(new Map());
  const [selectedFolder, setSelectedFolder] = useState("All");
  useEffect(() => { getFolders(setFolders) }, []);

  return (
    <>
      <header>
        <p>Website Name 3D Models</p>
      </header>
      <CategorySection folders={folders} selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} />
    </>
  )
}

async function getFolders(setFolders) {
  const url = "https://www.googleapis.com/drive/v3/files?key=AIzaSyCVDk734Nt4kQpEAO7vbsdwu73qQtA1iXw&q=%271e6KT-ONRiz90G_hqhdgOnLyhV80Phqf_%27+in+parents&fields=files(id,name,mimeType)&orderBy=name";
  const response = await fetch(url);
  const data = await response.json();

  const newFolders = new Map();
  newFolders.set("All", "x");
  data.files.forEach((file) => newFolders.set(file.name, file.id));
  setFolders(newFolders);
}

export default App
