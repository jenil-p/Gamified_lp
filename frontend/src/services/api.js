import axios from 'axios';

const API_URL = 'http://localhost:3000/api/';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Sending token:', token); // Debug
    } else {
        console.log('No token in localStorage'); // Debug
    }
    return config;
});

// Auth APIs
export const signup = (data) => api.post('/auth/signup', data);
export const login = (data) => api.post('/auth/login', data);
export const logout = () => api.get('/auth/logout');

// User APIs
export const getUser = () => api.get('/user/me');
export const getUserRoles = () => api.get('/user/roles');

// Role APIs
export const addRole = (data) => api.post('/role', data);

// RoleUser APIs
export const assignRole = (data) => api.post('/roleuser', data);
export const removeRole = (data) => api.delete('/roleuser', { data });

// PDF APIs
export const uploadPDF = (formData) =>
    api.post('/pdf/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const deletePDF = (id) => api.delete(`/pdf/${id}`);
export const getPDFs = () => api.get('/pdf/list');