import axios from 'axios';
// import { DEV_API_BASE_URL, PROD_API_BASE_URL } from '@env';
import { Platform } from 'react-native';
import { getAuthData } from '../utils/database';
import { ACCESS_TOKEN } from '../utils/storageKeys';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { refreshToken } from './apiUtils';
import uiText from '../constants/uiTexts';

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
    'Authorization': `Bearer ${getAuthData(ACCESS_TOKEN)}`,
  },
});

export const setupInterceptors = (router, deviceId) => {

api.interceptors.request.use(
    async (config) => {
      const token = await getAuthData(ACCESS_TOKEN);
        if (token) {
          const decodedToken = JSON.parse(atob(token?.split('.')[1]));
          const isTokenExpired = decodedToken?.exp * 1000 < Date.now(); // Check if expired
  
          if (isTokenExpired) {
            const newToken = await refreshToken(deviceId); // Refresh token
            config.headers['Authorization'] = `Bearer ${newToken}`; // Set new JWT in headers
          } else {
            config.headers['Authorization'] = `Bearer ${token}`; // Use existing JWT
          }
        }  
        config.headers['device-id'] = deviceId;    
      return config;
    },(error) => {
      console.log('error from req:', error)
        return Promise.reject(error);
      }
    );

    api.interceptors.response.use(response => {
      console.log('Response:', response?.data);
      return response;
  }, error => {
    router.replace('/(auth)/loginOrSignUp');  
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: uiText.LOGIN_SUCCESS,
    })
    const errorDetails = error?.response?.data?.errorDetails;
    console.log('Response Error:', error);
      if (errorDetails?.errorCode?.startsWith(6)) {
        Toast.show({
          type: 'error',
          title: 'Session Expired',
          message: 'Your session has expired. Please login again.',
          autoHide: true,
          duration: 3000,
        });
      }
      return Promise.reject(error);
  });
}
export default api;
