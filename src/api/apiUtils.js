import axios from 'axios';
import getStorage, { getRefreshToken } from '../utils/storage';
import { ACCESS_TOKEN } from '../utils/storageKeys';
import uApi from './unauthApi';
import api from './api';


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

export const postData = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error.message);
    throw error;
  }
};

export const unAuthPostData = async (endpoint, data) => {
  try {
    console.log('hello')
    const response = await uApi.post(endpoint, data);
    return response?.data;
  } catch (error) {
    console.error('Error posting data:', error?.message);
    throw error;
  }
};

export const refreshToken = async () => {
  const refreshToken = await getRefreshToken()
  try {
    const response = await axios.post(`${BASE_URL}/refresh-token`, {
      refresh_token: refreshToken,
    });
    const { access_token } = response.data; // Assuming the backend returns the new JWT
    await getStorage().setItem(ACCESS_TOKEN, access_token) // Store new JWT
    return access_token;
  } catch (error) {
    console.error('Error refreshing token:', error.message);
    throw error; // Handle error appropriately
  }
};