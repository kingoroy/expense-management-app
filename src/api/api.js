import axios from 'axios';
// import { DEV_API_BASE_URL, PROD_API_BASE_URL } from '@env';
import { Platform } from 'react-native';
import { getToken, getTokenSync, refreshToken } from '../utils/storage';

// export const getBaseUrl = () => {
//   if (__DEV__) {
//     if (Platform.OS === 'android') {
//       return 'http://10.0.2.2:3000/api';
//     }
//     return DEV_API_BASE_URL;
//   }
//   return PROD_API_BASE_URL; 
// };

const api = axios.create({
  // baseURL: 'http://localhost:8500/kshirsa/',
  baseURL: 'https://kshirsa-money-backend-dev.onrender.com/kshirsa',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getTokenSync()}`
  },
});


api.interceptors.request.use(
    async (config) => {
      console.log('inside')
      const token = await getToken();
        if (token) {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          const isTokenExpired = decodedToken.exp * 1000 < Date.now(); // Check if expired
  
          if (isTokenExpired) {
            const newToken = await refreshToken(); // Refresh token
            config.headers['Authorization'] = `Bearer ${newToken}`; // Set new JWT in headers
          } else {
            config.headers['Authorization'] = `Bearer ${token}`; // Use existing JWT
          }
        }      
      return config;
    },(error) => {
        return Promise.reject(error);
      }
    );

    api.interceptors.response.use(response => {
      console.log('Response:', response?.data);
      return response;
  }, error => {
      console.log('Response Error:', error?.response?.data);
      return Promise.reject(error);
  });
export default api;
