import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000", // backend server
    withCredentials: true, // send cookies (JWT)
});

// Auth routes
export const signup = (data) => API.post("/user/signup", data);
export const login = (data) => API.post("/user/login", data);
export const logout = () => API.get("/user/logout");

// PDF routes
export const uploadPdf = (formData) =>
    API.post("/pdf/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

export const deletePdf = (id) => API.delete(`/pdf/${id}`);
