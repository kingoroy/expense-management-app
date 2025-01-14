import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { getAllAuthData, getAuthData } from '../utils/database';
import { ACCESS_TOKEN } from '../utils/storageKeys';
import getUserDetailsAction from '../redux/actions/userDetailsAction';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from "@react-native-community/netinfo";
import { errorCodes } from '../constants/utils';
import SplashScreen from './SplashScreen';
import apiRoutes from '../constants/apiRoutes';
import { getStorageData } from '../utils/storage';

export default  function  Index() {
  const userDetails = useSelector((state) => state.userDetailsReducer?.data);
  const [initialRoute, setInitialRoute] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeApp = async () => {
      const existToken = await getStorageData(ACCESS_TOKEN);
      // Check network status
      const networkState = await NetInfo.fetch();
      if (networkState.isConnected) {
        if (existToken) {
          // If connected and token exists, fetch user details
          dispatch(getUserDetailsAction())
            .unwrap()
            .then((res) => {
              setTimeout(() => {
                if (res?.data?.isSignUpFlowCompleted) {
                  setInitialRoute(apiRoutes.main);
                } else {
                setInitialRoute(apiRoutes.registration);
                }  
              }, 3000);
            })
            .catch((error) => {
              const errorcode = error?.errorDetails?.errorCode;
                setInitialRoute(apiRoutes.auth);
            })
        } else {
          setTimeout(() => {
            setInitialRoute(apiRoutes.auth);
          }, 3000);
        }
      } else {
        if (existToken) {
          setTimeout(() => {
            setInitialRoute(apiRoutes.main);
          }, 3000);
        } else {
          setTimeout(() => {
            setInitialRoute(apiRoutes.auth);
          }, 3000);
        }
      }
    };

    initializeApp();
  }, []);


  return (
  !initialRoute ? <SplashScreen /> :
    <Redirect href={initialRoute} />
)
}
