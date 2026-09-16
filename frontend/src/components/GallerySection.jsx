import "./GallerySection.css";

function GallerySection({ folders, selectedFolder }) {
    if (!folders.size || selectedFolder === "") {
        return <section className="infoText">Select a Category</section>;
    }

    const files = folders.get(selectedFolder)?.files;
    if (files === null || files === undefined) {
        return <section className="infoText">Loading images...</section>;
    }

    return (
        <section className="gallerySection">
            {files.map((file) => <ImageCard key={file.id} file={file} />)}
        </section>
    );
}

function ImageCard({ file }) {
    const cleanName = file.name.substring(0, file.name.lastIndexOf("."));
    return (
        <div
            className="imageCard"
            onClick={() => { window.open(`https://lh3.googleusercontent.com/d/${file.id}`); }}
        >
            <img
                src={`https://drive.google.com/thumbnail?id=${file.id}&sz=w300`}
                alt={file.name}
                loading="lazy"
            />
            <p>{cleanName}</p>
        </div>
    );
}

export default GallerySection;