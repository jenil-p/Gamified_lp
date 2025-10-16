import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { uploadPDF } from '../services/api';
import './PDFUpload.css'

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
        <>
            <h2 className="text">Upload PDF</h2>
        <div className="container2">
            <form onSubmit={handleSubmit} className="form">
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="input1"
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
                        className="input1"
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
                        className="input1"
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
                        className="input1"
                        required
                    />
                </div>
                <button type="submit" className="btn">
                    Upload PDF
                </button>
            </form>
        </div>
        </>
    );
}

export default PDFUpload;