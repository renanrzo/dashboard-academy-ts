import axios from 'axios';

// const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: "https://site-pessoal-api-fizg.onrender.com/api",
});

export default api;