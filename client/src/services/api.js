import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
        Accept: "application/json",
    },
});

export const logout = () => api.post("/api/logout");
export const login = (data) => api.post("/api/login", data);
export const register = (data) => api.post("/api/register", data);

export default api;