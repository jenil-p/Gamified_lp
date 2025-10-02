
export default function StudentDashboard({ user, notes }) {
    return (
        <section className="space-y-4">
            <h2 className="text-xl font-semibold">Student Dashboard</h2>
            <div className="p-6 border rounded-lg bg-slate-50 flex items-center justify-between">
                <div>
                    <div className="text-lg font-medium">View Modules</div>
                    <div className="text-sm text-slate-600 mt-1">(Placeholder) Browse notes and modules uploaded by professors.</div>
                </div>
                <div>
                    <button className="px-4 py-2 border rounded-md">View Modules</button>
                </div>
            </div>

            <div>
                <h3 className="font-medium">Recent Notes (public)</h3>
                {notes.length === 0 ? (
                    <div className="mt-2 text-sm text-slate-500">No notes available yet.</div>
                ) : (
                    <ul className="mt-2 space-y-2">
                        {notes.map((n) => (
                            <li key={n.id} className="p-3 border rounded-md bg-white">
                                <div className="font-semibold">{n.title}</div>
                                <div className="text-sm text-slate-600">{n.fileName} • by {n.uploadedBy} • {n.date}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}