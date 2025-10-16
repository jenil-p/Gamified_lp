import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { addRole, assignRole, removeRole } from '../services/api';
import './RoleManagement.css';

function RoleManagement() {
  const { user } = useContext(AuthContext);
  const [roleForm, setRoleForm] = useState({ role: '' });
  const [assignForm, setAssignForm] = useState({ role: '', userAssign: '' });
  const [removeForm, setRemoveForm] = useState({ roleName: '', UserToDeassignEmail: '' });

  const handleRoleChange = (e) => setRoleForm({ role: e.target.value });
  const handleAssignChange = (e) => setAssignForm({ ...assignForm, [e.target.name]: e.target.value });
  const handleRemoveChange = (e) => setRemoveForm({ ...removeForm, [e.target.name]: e.target.value });

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

  if (!user) return <div className="no-user">Please log in to manage roles.</div>;

  return (
    <div className="role-management-container">
      <h2 className="heading">Role Management</h2>

      <div className="forms-wrapper">
        {/* Add Role Section */}
        <div className="form-card">
          <form onSubmit={handleAddRole}>
            <h3>Add New Role</h3>
            <input
              type="text"
              name="role"
              value={roleForm.role}
              onChange={handleRoleChange}
              placeholder="Role name (e.g., ADMIN)"
              className="input-field"
              required
            />
            <button type="submit" className="btn">Add Role</button>
          </form>
        </div>

        {/* Assign Role Section */}
        <div className="form-card">
          <form onSubmit={handleAssignRole}>
            <h3>Assign Role to User</h3>
            <input
              type="text"
              name="role"
              value={assignForm.role}
              onChange={handleAssignChange}
              placeholder="Role name"
              className="input-field"
              required
            />
            <input
              type="email"
              name="userAssign"
              value={assignForm.userAssign}
              onChange={handleAssignChange}
              placeholder="User email"
              className="input-field"
              required
            />
            <button type="submit" className="btn">Assign Role</button>
          </form>
        </div>

        {/* Remove Role Section */}
        <div className="form-card">
          <form onSubmit={handleRemoveRole}>
            <h3>Remove Role from User</h3>
            <input
              type="text"
              name="roleName"
              value={removeForm.roleName}
              onChange={handleRemoveChange}
              placeholder="Role name"
              className="input-field"
              required
            />
            <input
              type="email"
              name="UserToDeassignEmail"
              value={removeForm.UserToDeassignEmail}
              onChange={handleRemoveChange}
              placeholder="User email"
              className="input-field"
              required
            />
            <button type="submit" className="btn remove">Remove Role</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RoleManagement;
