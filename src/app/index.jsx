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

export default  function  Index() {
  const userDetails = useSelector((state) => state.userDetailsReducer?.data);
  const [initialRoute, setInitialRoute] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeApp = async () => {
      const existToken = await getAuthData(ACCESS_TOKEN);
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
              console.log(error, 'error from index')
              const errorcode = error?.errorDetails?.errorCode;
              // if (
              //   errorcode === errorCodes.jwtExpired ||
              //   errorcode === errorCodes.jwtMissing
              // )
              //  {
                setInitialRoute(apiRoutes.auth);
              // }
            })
        } else {
          // If connected but no token, go to auth flow
          setTimeout(() => {
            setInitialRoute(apiRoutes.auth);
          }, 3000);
        }
      } else {
        // If no network
        if (existToken) {
          // Token exists, proceed to home
          setTimeout(() => {
            setInitialRoute(apiRoutes.main);
          }, 3000);
        } else {
          // No token, show no internet page
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
