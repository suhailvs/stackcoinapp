import axios from "axios";

const api = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL || "http://192.168.85.167:8000",
    baseURL: "https://suhailvs.pythonanywhere.com",
});

export default api;