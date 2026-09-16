import { useState, useEffect } from 'react';
import './App.css'
import { Envelope, Phone } from '@boxicons/react';
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
        <div className="leading"></div>
        <p className="titleText">Creatory3D Models</p>
        <div className="trailing">
          <button onClick={() => { window.open("https://wa.me/919229333944?text=Hi%21%20I%27m%20Interested%20in%20purchasing%20a%203D%20Model"); }}>Contact</button>
        </div>
      </header>
      <CategorySection folders={folders} selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} />
      <GallerySection folders={folders} selectedFolder={selectedFolder} />
      <footer>
        <div>
          <Envelope pack="filled" fill="currentColor" className="infoIcon" />
          <p className="infoText">creatory3dprints@gmail.com</p>
        </div>
        <div>
          <Phone pack="filled" fill="currentColor" className="infoIcon" />
          <p className="infoText">+91 9229333944</p>
        </div>
      </footer>
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
