import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5001/api/v1', // Backend URL
});

// Add a request interceptor to attach the token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach token to the request header
  }
  return config;
});

export default apiClient;
