import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Create an Axios instance
const httpClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL, // Replace with your API base URL
  timeout: 5000, // Timeout in milliseconds
});

// Request interceptor
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // You can add custom headers here
    // config.headers['Authorization'] = `Bearer ${token}`;
    console.log('Request:', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Handle successful response
    console.log('Response:', response);
    return response;
  },
  (error) => {
    // Handle error response
    console.error('Error response:', error);
    return Promise.reject(error);
  }
);

export default httpClient;

