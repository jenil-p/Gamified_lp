import { useState } from "react";

export default function ProfessorDashboard({ user, notes, setNotes }) {
    const [title, setTitle] = useState("");
    const [fileName, setFileName] = useState("");

    function handleFileChange(e) {
        const f = e.target.files[0];
        setFileName(f ? f.name : "");
    }

    function handleUpload(e) {
        e.preventDefault();
        if (!title.trim() || !fileName) return alert("Provide title and choose a file");
        const newNote = {
            id: Date.now(),
            title: title.trim(),
            fileName,
            uploadedBy: user.name,
            date: new Date().toLocaleString(),
        };
        setNotes((s) => [newNote, ...s]);
        setTitle("");
        setFileName("");
        const fi = document.getElementById("file-input");
        if (fi) fi.value = "";
    }

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Professor Dashboard</h2>
                <div className="text-sm text-slate-500">You can upload notes for students</div>
            </div>

            <div className="p-4 border rounded-lg bg-slate-50">
                <h3 className="font-medium mb-2">Upload Notes</h3>
                <form onSubmit={handleUpload} className="space-y-3">
                    <div>
                        <label className="block text-sm text-slate-700">Title</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" placeholder="e.g. Week 4 - React Hooks" />
                    </div>

                    <div>
                        <label className="block text-sm text-slate-700">File</label>
                        <input id="file-input" type="file" onChange={handleFileChange} className="mt-1" />
                        {fileName && <div className="text-sm text-slate-600 mt-1">Selected: {fileName}</div>}
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-md">Upload</button>
                        <button type="button" className="px-4 py-2 border rounded-md" onClick={() => { setTitle(""); setFileName(""); const fi = document.getElementById('file-input'); if (fi) fi.value = ''; }}>Clear</button>
                    </div>
                </form>
            </div>

            <div>
                <h3 className="font-medium">Uploaded Notes</h3>
                {notes.length === 0 ? (
                    <div className="mt-2 text-sm text-slate-500">No notes uploaded yet.</div>
                ) : (
                    <ul className="mt-2 space-y-2">
                        {notes.map((n) => (
                            <li key={n.id} className="p-3 border rounded-md bg-white">
                                <div className="font-semibold">{n.title}</div>
                                <div className="text-sm text-slate-600">{n.fileName} • uploaded by {n.uploadedBy} • {n.date}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}