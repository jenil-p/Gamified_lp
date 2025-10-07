import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { getPDFs } from '../services/api';

function Dashboard() {
    const { user } = useContext(AuthContext);
    const [pdfs, setPdfs] = useState([]);
    const [userDetails, setUserDetails] = useState(null);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user details (assuming a /user/me endpoint)
                const userResponse = await axios.get('http://localhost:3000/api/user/me', {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setUserDetails(userResponse.data.user);

                // Fetch user roles (assuming a /user/roles endpoint or included in user details)
                const rolesResponse = await axios.get('http://localhost:3000/api/user/roles', {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setRoles(rolesResponse.data.roles);

                // Fetch PDFs uploaded by the user
                const pdfResponse = await getPDFs();
                setPdfs(pdfResponse.data.pdfs.filter((pdf) => pdf.uploadedBy._id === userResponse.data.user._id));
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchData();
    }, [user]);

    if (loading) return <div className="container mx-auto p-4">Loading...</div>;

    if (!user || !userDetails) return <div className="container mx-auto p-4">Please log in.</div>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

            {/* User Information */}
            <div className="mb-8 p-4 bg-white rounded shadow">
                <h3 className="text-xl font-semibold mb-2">User Information</h3>
                <p><strong>Name:</strong> {userDetails.fullname}</p>
                <p><strong>Email:</strong> {userDetails.instituteMail}</p>
                <p><strong>Contact:</strong> {userDetails.contactNumber || 'Not provided'}</p>
                <p><strong>Roles:</strong> {roles.length > 0 ? roles.map((role) => role.role).join(', ') : 'None'}</p>
            </div>

            {/* Uploaded PDFs */}
            <div className="p-4 bg-white rounded shadow">
                <h3 className="text-xl font-semibold mb-2">Your Uploaded PDFs</h3>
                {pdfs.length === 0 ? (
                    <p>No PDFs uploaded yet.</p>
                ) : (
                    <div className="grid gap-4">
                        {pdfs.map((pdf) => (
                            <div key={pdf._id} className="p-4 border rounded flex justify-between">
                                <div>
                                    <h4 className="text-lg font-semibold">{pdf.title}</h4>
                                    <p>Class ID: {pdf.classID._id}</p>
                                    <p>Subject ID: {pdf.subjectID._id}</p>
                                    <p>Uploaded: {new Date(pdf.createdAt).toLocaleDateString()}</p>
                                </div>
                                <a
                                    href={`/uploads/${pdf.path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-600 text-white p-2 rounded"
                                >
                                    View PDF
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;