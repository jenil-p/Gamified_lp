import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signup } from '../services/api';

function Signup() {
    const [formData, setFormData] = useState({
        fullname: '',
        instituteMail: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(formData);
            toast.success('Signup successful! Please login.');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Signup</h2>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div>
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
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
                    Signup
                </button>
            </form>
        </div>
    );
}

export default Signup;