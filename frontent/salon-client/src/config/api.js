import axios from "axios";

const url = 'http://localhost:5000';
const API_BASE_URL = `${url}`;

const api = axios.create({
    baseURL: "http://localhost:5000",
})

api.defaults.headers.post["Content-Type"] = "application/json";

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
