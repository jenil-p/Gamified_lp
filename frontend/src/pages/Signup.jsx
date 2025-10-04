import { useState } from "react";
import { signup } from "../api/api";

export default function Signup() {
    const [form, setForm] = useState({ fullname: "", instituteMail: "", password: "", role: "STUDENT" });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(form);
        alert("Signup successful! Please login.");
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 mt-10 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="fullname"
                    placeholder="Full Name"
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    name="instituteMail"
                    placeholder="Institute Email"
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                />
                <select
                    name="role"
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                >
                    <option value="STUDENT">Student</option>
                    <option value="FACULTY">Faculty</option>
                    <option value="ADMIN">Admin</option>
                </select>
                <button
                    type="submit"
                    className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-700"
                >
                    Signup
                </button>
            </form>
        </div>
    );
}
