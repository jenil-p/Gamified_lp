import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import PDFList from './pages/PDFList';
import PDFUpload from './pages/PDFUpload';
import RoleManagement from './pages/RoleManagement';
import Signup from './pages/Signup';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/roles" element={<RoleManagement />} />
          <Route path="/pdf/upload" element={<PDFUpload />} />
          <Route path="/pdf/list" element={<PDFList />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;