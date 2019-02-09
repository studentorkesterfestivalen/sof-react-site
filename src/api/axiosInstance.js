import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT 

const api = axios.create({
  baseURL: API_ENDPOINT, 
  timeout: 1000,
  headers: {'Content-Type': 'application/json'}
});

api.interceptors.request.use (
  function (config) {
    const token = localStorage.getItem('access-token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject (error);
  }
);

export default api;