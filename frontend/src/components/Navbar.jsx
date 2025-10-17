import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, roles, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="containerr">
        <h1 className="logo">Map<span>iq</span></h1>
        <div className="links">
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              {Array.isArray(roles) && roles.includes('admin') && <Link to="/roles">Role Management</Link>}
              {Array.isArray(roles) && roles.includes('professor') && <Link to="/pdf/upload">Upload PDF</Link>}
              <Link to="/pdf/list">PDF List</Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/login" className="nav-link">Login</Link>
              {roles.includes('admin') && <Link to="/signup" className="nav-link">Signup</Link>}            </>
          )}
        </div>
      </div>
      <hr />
      <style jsx>{`
        .navbar {
          background: #fff;
          padding: 16px 0;
        }
        .containerr {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        .logo {
          font-size: 2rem;
          font-weight: bold;
          color: black;
        }
        .logo span
        {
        color:#D87D4A;
        }
        .links {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .links a,
        .logout-btn {
          color: black;
          text-decoration: none;
          padding: 8px 12px;
          border: none;
          background: none;
          cursor: pointer;
          font-size: 1rem;
          border-radius: 4px;
          transition: background 0.3s;
        }
        .nav-link:hover {
          background: #f4f4f4;
        }
        .logout-btn:hover {
          background: #f4f4f4;
        }
        @media (max-width: 768px) {
          .container {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .links {
            width: 100%;
            justify-content: flex-start;
            gap: 10px;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
