export default function PdfCard({ pdf, onDelete }) {
    return (
        <div className="border rounded-lg p-4 bg-gray-50 shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-blue-800">{pdf.title}</h3>
            <p className="text-sm text-gray-600">Class: {pdf.classID} | Subject: {pdf.subjectID}</p>
            <a
                href={`http://localhost:5000/${pdf.path}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline block mt-2"
            >
                View PDF
            </a>
            <button
                onClick={() => onDelete(pdf._id)}
                className="mt-3 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
                Delete
            </button>
        </div>
    );
}
