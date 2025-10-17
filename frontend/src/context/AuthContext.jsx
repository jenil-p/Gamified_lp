import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserRoles, logout } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser({ token });
        }
        setLoading(false);
    }, []);
    const fetchRoles = async (token) => {
        try {
            const response = await getUserRoles();
            setRoles(response.data.roles.map((role) => role.name.toLowerCase())); // Normalize role names
            setLoading(false);
        } catch (error) {
            console.error('Error fetching roles:', error);
            toast.error('Failed to fetch user roles');
            setLoading(false);
        }
    };
    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('token');
            setUser(null);
            toast.success('Logged out successfully!');
            navigate('/login');
        } catch (error) {
            toast.error('Logout failed');
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, roles, setRoles, handleLogout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};