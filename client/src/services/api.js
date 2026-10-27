import axios from 'axios';

const API = axios.create({
  baseURL: 'https://static-code-assistant-server.vercel.app/api',
  withCredentials: true, // CRITICAL: Ensures cookies are sent with every request across subdomains
  headers: {
    'Content-Type': 'application/json'
  }
});

export default API;
