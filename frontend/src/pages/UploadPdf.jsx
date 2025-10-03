import { useState } from "react";
import { uploadPdf } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function UploadPdf() {
    const [file, setFile] = useState(null);
    const [form, setForm] = useState({ title: "", classID: "", subjectID: "" });
    const { user } = useAuth();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return alert("Please select a PDF");
        const formData = new FormData();
        formData.append("pdf", file);
        formData.append("title", form.title);
        formData.append("classID", form.classID);
        formData.append("subjectID", form.subjectID);
        formData.append("user", user._id);

        await uploadPdf(formData);
        alert("PDF uploaded successfully!");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" placeholder="Title" onChange={handleChange} />
            <input name="classID" placeholder="Class ID" onChange={handleChange} />
            <input name="subjectID" placeholder="Subject ID" onChange={handleChange} />
            <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
            <button type="submit">Upload PDF</button>
        </form>
    );
}
