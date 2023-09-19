import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://86.107.44.200:8076/',
});

// Add a request interceptor to include the token in the headers
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

function isTokenValid() {
    return localStorage.getItem('accessToken') & isTokenExpired()
}

// Check if a token is expired (you can implement your own logic)
function isTokenExpired(token) {
    let check = false
    fetch('http://86.107.44.200:8076/api/v1/users/' + localStorage.getItem('userId'), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer_' + localStorage.getItem('accessToken')
        }
    })
        .then((response) => {
            check = response.ok
            return response.json()
        })
    console.log(check)
    return check;
}

export default instance;
