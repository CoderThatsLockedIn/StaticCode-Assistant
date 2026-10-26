import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // Required to send and receive HttpOnly cookies automatically
});

export default API;