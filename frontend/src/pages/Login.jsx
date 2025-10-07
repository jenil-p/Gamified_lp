import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

function Login() {
    const { handleLogin } = useContext(AuthContext);
    const [formData, setFormData] = useState({ instituteMail: '', password: '' });

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin(formData.instituteMail, formData.password);
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