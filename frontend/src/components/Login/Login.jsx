import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ handleLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        handleLogin(username, password, navigate);
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-700">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                    placeholder="Enter your username"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                    placeholder="Enter your password"
                />
            </div>

            <button
                type="submit"
                className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700"
            >
                Login
            </button>
        </form>
    );
}
