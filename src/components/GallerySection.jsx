import "./GallerySection.css";

function GallerySection({ folders, selectedFolder }) {
    if (!folders.size || selectedFolder === "All") {
        return <></>;
    }

    const files = folders.get(selectedFolder).files;

    return (
        <section className="gallerySection">
            {files.map((file) => <ImageCard key={file.id} file={file} />)}
        </section>
    );
}

function ImageCard({ file }) {
    const cleanName = file.name.substring(0, file.name.lastIndexOf("."));
    return (
        <div className="imageCard">
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