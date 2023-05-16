import axios from 'axios';

const api = axios.create({
    baseURL: 'https://json-server-h9f5.onrender.com',
});

export default api;