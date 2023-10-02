import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://86.107.44.200:8075/',
});

// Add a request interceptor to include the token in the headers
instance.interceptors.request.use((config) => {
    // const token = localStorage.getItem('accessToken');
    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
});


export default instance;
