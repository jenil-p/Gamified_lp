import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, logoutUser } = useAuth();

    return (
        <nav className="bg-blue-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
            <h1 className="font-bold text-lg">Gamified IP</h1>
            <div className="space-x-4">
                <Link to="/" className="hover:text-yellow-400">Home</Link>
                {user ? (
                    <>
                        <Link to="/upload" className="hover:text-yellow-400">Upload PDF</Link>
                        <button
                            onClick={logoutUser}
                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:text-yellow-400">Login</Link>
                        <Link to="/signup" className="hover:text-yellow-400">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
