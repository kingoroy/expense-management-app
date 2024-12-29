// import { MMKV } from 'react-native-mmkv';
import Constants from 'expo-constants';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './storageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';



// export const mmkv = new MMKV();


export default getStorage = () => {
  // if (Constants.executionEnvironment === 'storeClient') {
    return {
      setItem: (key, value) => AsyncStorage.setItem(key, JSON.stringify(value)),
      getItem: (key) =>  AsyncStorage.getItem(key),
      removeItem: (key) => AsyncStorage.removeItem(key),
    };
  // } else {
    return false
    // return {
    //   setItem: (key, value) => mmkv.set(key, value),
    //   getItem: (key) => mmkv.getString(key),
    //   removeItem: (key) => mmkv.delete(key),
    // };
  // }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN);
    if (!token || token.trim() === "") {
      console.warn("Token is missing or empty.");
      return null;
    }
    return token;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};


export const getTokenSync = () => {
  let cachedToken = null;
  if (cachedToken !== null) {
    return cachedToken;
  }
  getToken().then((token) => {
    cachedToken = token || null
  });

  return cachedToken;
};

export const getRefreshToken = async () => {
  const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN);
  return refreshToken;
};

export const isTokenExpired = async () => {
  const token = await getToken();
  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  }
  else {
    return true;
  }
};