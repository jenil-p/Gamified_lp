import { useEffect, useState } from "react";
import { deletePdf } from "../api/api";
import PdfCard from "../components/PdfCard";

export default function Dashboard() {
    const [pdfs, setPdfs] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/pdfs") // you might need to create a GET route in backend
            .then((res) => res.json())
            .then((data) => setPdfs(data));
    }, []);

    const handleDelete = async (id) => {
        await deletePdf(id);
        setPdfs(pdfs.filter((pdf) => pdf._id !== id));
    };

    return (
        <div>
            <h2>My PDFs</h2>
            {pdfs.map((pdf) => (
                <PdfCard key={pdf._id} pdf={pdf} onDelete={handleDelete} />
            ))}
        </div>
    );
}
