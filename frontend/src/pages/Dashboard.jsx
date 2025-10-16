import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { getPDFs } from '../services/api';
import './Dashboard.css'

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
        <div className="container">
            <h2>Dashboard</h2>
            <div className="shadow">
                <h3 className="text">User Information</h3>
                <p><strong>Name:</strong> {userDetails.fullname}</p>
                <p><strong>Email:</strong> {userDetails.instituteMail}</p>
                <p><strong>Contact:</strong> {userDetails.contactNumber || 'Not provided'}</p>
                <p><strong>Roles:</strong> {roles.length > 0 ? roles.map((role) => role.role).join(', ') : 'None'}</p>
            </div>

            {/* Uploaded PDFs */}
            <div className="p">
                <h3 className="t">Your Uploaded PDFs</h3>
                {pdfs.length === 0 ? (
                    <p>No PDFs uploaded yet.</p>
                ) : (
                    <div className="g">
                        {pdfs.map((pdf) => (
                            <div key={pdf._id} className="p">
                                <div>
                                    <h4 className="t">{pdf.title}</h4>
                                    <p>Class ID: {pdf.classID._id}</p>
                                    <p>Subject ID: {pdf.subjectID._id}</p>
                                    <p>Uploaded: {new Date(pdf.createdAt).toLocaleDateString()}</p>
                                </div>
                                <a
                                    href={`/uploads/${pdf.path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="b"
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