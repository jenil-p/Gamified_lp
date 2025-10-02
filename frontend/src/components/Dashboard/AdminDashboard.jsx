
export default function AdminDashboard({ user, notes, setNotes }) {
    return (
        <section className="space-y-4">
            <h2 className="text-xl font-semibold">Admin Dashboard</h2>
            <div className="p-4 border rounded-lg bg-slate-50">
                <div className="text-sm text-slate-600">Admin controls (placeholder)</div>
                <ul className="mt-3 space-y-2">
                    <li className="flex justify-between items-center">
                        <div>Manage users</div>
                        <button className="px-3 py-1 border rounded-md">Open</button>
                    </li>
                    <li className="flex justify-between items-center">
                        <div>Site settings</div>
                        <button className="px-3 py-1 border rounded-md">Open</button>
                    </li>
                </ul>
            </div>

            <div>
                <h3 className="font-medium">All Uploaded Notes</h3>
                {notes.length === 0 ? (
                    <div className="mt-2 text-sm text-slate-500">No notes uploaded yet.</div>
                ) : (
                    <ul className="mt-2 space-y-2">
                        {notes.map((n) => (
                            <li key={n.id} className="p-3 border rounded-md bg-white flex justify-between">
                                <div>
                                    <div className="font-semibold">{n.title}</div>
                                    <div className="text-sm text-slate-600">{n.fileName} • by {n.uploadedBy} • {n.date}</div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 border rounded-md">Delete</button>
                                    <button className="px-3 py-1 border rounded-md">Edit</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}