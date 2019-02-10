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
    const client = localStorage.getItem('client');
    const uid    = localStorage.getItem('uid');
    const expiry    = localStorage.getItem('expiry');
    const token_type    = localStorage.getItem('token-type');
    
    if (token){
      config.headers['access-token'] = token;
      config.headers['client'] = client;
      config.headers['uid']    = uid;
      config.headers['expiry'] = expiry;
      config.headers['token-type'] = token_type;
    }
    return config;
  },
  function (error) {
    return Promise.reject (error);
  }
);

export default api;
