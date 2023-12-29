import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.reddel.kz/',
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
