import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { addRole, assignRole, removeRole } from '../services/api';

function RoleManagement() {
    const { user } = useContext(AuthContext);
    const [roleForm, setRoleForm] = useState({ role: '' });
    const [assignForm, setAssignForm] = useState({ role: '', userAssign: '' });
    const [removeForm, setRemoveForm] = useState({ roleName: '', UserToDeassignEmail: '' });

    const handleRoleChange = (e) => setRoleForm({ role: e.target.value });
    const handleAssignChange = (e) =>
        setAssignForm({ ...assignForm, [e.target.name]: e.target.value });
    const handleRemoveChange = (e) =>
        setRemoveForm({ ...removeForm, [e.target.name]: e.target.value });

    const handleAddRole = async (e) => {
        e.preventDefault();
        try {
            await addRole(roleForm);
            toast.success('Role added successfully!');
            setRoleForm({ role: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add role');
        }
    };

    const handleAssignRole = async (e) => {
        e.preventDefault();
        try {
            await assignRole(assignForm);
            toast.success('Role assigned successfully!');
            setAssignForm({ role: '', userAssign: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to assign role');
        }
    };

    const handleRemoveRole = async (e) => {
        e.preventDefault();
        try {
            await removeRole(removeForm);
            toast.success('Role removed successfully!');
            setRemoveForm({ roleName: '', UserToDeassignEmail: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to remove role');
        }
    };

    if (!user) return <div>Please log in to manage roles.</div>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Role Management</h2>

            {/* Add Role */}
            <form onSubmit={handleAddRole} className="mb-8 max-w-md">
                <h3 className="text-xl mb-2">Add New Role</h3>
                <input
                    type="text"
                    name="role"
                    value={roleForm.role}
                    onChange={handleRoleChange}
                    placeholder="Role name (e.g., ADMIN)"
                    className="w-full p-2 border rounded mb-2"
                    required
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                    Add Role
                </button>
            </form>

            {/* Assign Role */}
            <form onSubmit={handleAssignRole} className="mb-8 max-w-md">
                <h3 className="text-xl mb-2">Assign Role to User</h3>
                <input
                    type="text"
                    name="role"
                    value={assignForm.role}
                    onChange={handleAssignChange}
                    placeholder="Role name"
                    className="w-full p-2 border rounded mb-2"
                    required
                />
                <input
                    type="email"
                    name="userAssign"
                    value={assignForm.userAssign}
                    onChange={handleAssignChange}
                    placeholder="User email"
                    className="w-full p-2 border rounded mb-2"
                    required
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                    Assign Role
                </button>
            </form>

            {/* Remove Role */}
            <form onSubmit={handleRemoveRole} className="max-w-md">
                <h3 className="text-xl mb-2">Remove Role from User</h3>
                <input
                    type="text"
                    name="roleName"
                    value={removeForm.roleName}
                    onChange={handleRemoveChange}
                    placeholder="Role name"
                    className="w-full p-2 border rounded mb-2"
                    required
                />
                <input
                    type="email"
                    name="UserToDeassignEmail"
                    value={removeForm.UserToDeassignEmail}
                    onChange={handleRemoveChange}
                    placeholder="User email"
                    className="w-full p-2 border rounded mb-2"
                    required
                />
                <button type="submit" className="bg-red-600 text-white p-2 rounded">
                    Remove Role
                </button>
            </form>
        </div>
    );
}

export default RoleManagement;