import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
    const { user, handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <nav className="bg-blue-600 p-4 text-white">
            <div className="container mx-auto flex justify-between">
                <Link to="/" className="text-xl font-bold">Gamified Ip</Link>
                <div className="space-x-4">
                    {user ? (
                        <>
                            <Link to="/dashboard">Dashboard</Link>
                            <Link to="/roles">Role Management</Link>
                            <Link to="/pdf/upload">Upload PDF</Link>
                            <Link to="/pdf/list">PDF List</Link>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;