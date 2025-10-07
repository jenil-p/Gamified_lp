import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deletePDF, getPDFs } from '../services/api';

function PDFList() {
    const [pdfs, setPdfs] = useState([]);

    useEffect(() => {
        const fetchPDFs = async () => {
            try {
                const response = await getPDFs();
                setPdfs(response.data.pdfs);
            } catch (error) {
                toast.error('Failed to fetch PDFs');
            }
        };
        fetchPDFs();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deletePDF(id);
            setPdfs(pdfs.filter((pdf) => pdf._id !== id));
            toast.success('PDF deleted successfully!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete PDF');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">PDF List</h2>
            <div className="grid gap-4">
                {pdfs.map((pdf) => (
                    <div key={pdf._id} className="p-4 border rounded flex justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">{pdf.title}</h3>
                            <p>Class ID: {pdf.classID}</p>
                            <p>Subject ID: {pdf.subjectID}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(pdf._id)}
                            className="bg-red-600 text-white p-2 rounded"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PDFList;