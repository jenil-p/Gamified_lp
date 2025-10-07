import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, logout } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Optionally verify token with backend
            setUser({ token });
        }
        setLoading(false);
    }, []);

    const handleLogin = async (instituteMail, password) => {
        try {
            const response = await login({ instituteMail, password });
            localStorage.setItem('token', response.data.token);
            setUser({ token: response.data.token });
            toast.success('Login successful!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
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
        <AuthContext.Provider value={{ user, handleLogin, handleLogout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};