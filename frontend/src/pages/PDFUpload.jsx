import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { uploadPDF } from '../services/api';

function PDFUpload() {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        title: '',
        classID: '',
        subjectID: '',
        file: null,
    });

    const handleChange = (e) => {
        if (e.target.name === 'file') {
            setFormData({ ...formData, file: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('classID', formData.classID);
        data.append('subjectID', formData.subjectID);
        data.append('user', user?.token); // Adjust based on how user ID is stored
        data.append('pdf', formData.file);

        try {
            await uploadPDF(data);
            toast.success('PDF uploaded successfully!');
            setFormData({ title: '', classID: '', subjectID: '', file: null });
        } catch (error) {
            toast.error(error.response?.data?.message || 'PDF upload failed');
        }
    };

    if (!user) return <div>Please log in to upload PDFs.</div>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Upload PDF</h2>
            <form onSubmit={handleSubmit} className="max-w-md space-y-4">
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label>Class ID</label>
                    <input
                        type="text"
                        name="classID"
                        value={formData.classID}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label>Subject ID</label>
                    <input
                        type="text"
                        name="subjectID"
                        value={formData.subjectID}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label>PDF File</label>
                    <input
                        type="file"
                        name="file"
                        accept="application/pdf"
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                    Upload PDF
                </button>
            </form>
        </div>
    );
}

export default PDFUpload;