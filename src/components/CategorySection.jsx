import "./CategorySection.css";

function CategorySection({ folders, selectedFolder, setSelectedFolder }) {
    return (
        <section className="categorySection">
            {Array.from(folders).map(([name, id], i) => (
                <CategoryCard key={name} name={name} selected={name == selectedFolder} setSelectedFolder={setSelectedFolder} />
            ))}
        </section>
    );
}

function CategoryCard({ name, selected, setSelectedFolder }) {
    return (
        <div
            className={`categoryCard ${selected ? "selected" : ""}`}
            onClick={() => setSelectedFolder(name)}
        >
            {name}
        </div>
    );
}

export default CategorySection;