import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN, REFRESH_TOKEN_EXPIRY_TIME } from '../utils/storageKeys';
import uApi from './unauthApi';
import api from './api';
import * as db from '../utils/database';
// import useDeviceId from '../hooks/useDeviceId';

export const buildQueryString = (params) => {
  return params && Object.keys(params).length > 0
  
    ? `?${new URLSearchParams(params).toString()}`
    : '';
};


export const fetchData = async (endpoint, queryParams = {}) => {
  try {
    const queryString = buildQueryString(queryParams);
    const formattedUrl = `${endpoint}${queryString}`;
    const response = await api.get(formattedUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const unAuthfetchData = async (endpoint, queryParams={}) => {
  try {
    const queryString = buildQueryString(queryParams);
    const formattedUrl = `${endpoint}${queryString}`;
    const response = await uApi.get(formattedUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

export const sendData = async ({endpoint, body = {}, pathParams = '', queryParams = {}, headers = {}, method='post'}) => {
  try {
    if (pathParams) {
      endpoint = `${endpoint}/${pathParams}`;
    }
    console.log(headers, 'headers')
    const response = await api[method](endpoint, body, {
      params: queryParams,
      headers: headers,
    });

    return response?.data;
  } catch (error) {
    console.error('Error posting data:', error?.message);
    throw error;
  }
};

export const unAuthsendData = async ({endpoint, body = {}, pathParams = '', queryParams = {}, headers = {}}) => {
  try {
    if (pathParams) {
      endpoint = `${endpoint}/${pathParams}`;
    }
    console.log(headers, 'headers')
    const response = await uApi.post(endpoint, body, {
      params: queryParams,
      headers: headers,
    });

    return response?.data;
  } catch (error) {
    console.error('Error posting data:', error?.message);
    throw error;
  }
};


export const refreshToken = async (deviceId) => {
  const refreshToken = await db.getAuthData(REFRESH_TOKEN);
  try {
    console.log('hello')
    const response = await axios.post(`${BASE_URL}/refresh-token?token=${refreshToken}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'device-id': deviceId
        },
      }
    );
    const { jwtToken, refreshTokenExpiryTime } = response?.data?.data; // Assuming the backend returns the new JWT
    await db.updateAuthField(ACCESS_TOKEN, jwtToken);
    await db.updateAuthField(REFRESH_TOKEN_EXPIRY_TIME, refreshTokenExpiryTime);
    return jwtToken;
  } catch (error) {
    console.error('Error refreshing token:', error.message);
    throw error; // Handle error appropriately
  }
}