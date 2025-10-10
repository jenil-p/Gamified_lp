import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { login } from '../services/api';

function Login() {
    const { setUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({ instituteMail: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            console.log('Login response:', response); // Debug full response
            const token = response.data.token;
            if (!token) {
                console.error('No token in response:', response.data);
                throw new Error('No token in response');
            }
            localStorage.setItem('token', token);
            console.log('Token stored in localStorage:', localStorage.getItem('token')); // Debug
            setUser({ token, instituteMail: formData.instituteMail });
            toast.success('Login successful!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error.response || error);
            toast.error(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="instituteMail"
                        value={formData.instituteMail}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;