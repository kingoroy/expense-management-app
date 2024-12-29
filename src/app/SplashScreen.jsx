import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Colors from '../styles/Colors';
import { getToken, getTokenSync } from '../utils/storage';
import { useDispatch, useSelector } from 'react-redux';
import getUserDetailsAction from '../redux/actions/userDetailsAction';
import { errorCodes } from '../constants/utils';

const SplashScreen = ({existToken, setIsLogged, setIsAppReady}) => {
    const dispatch = useDispatch();
    console.log(existToken, 'token')

    useEffect(() => {
      if (existToken) {
        dispatch(getUserDetailsAction()).unwrap()
        .then(() => {
          setIsLogged(true)
          setIsAppReady(true)
        }).catch((error) => {
          const errorcode = error?.errorDetails?.errorCode
          if(errorcode === errorCodes.jwtExpired || errorcode === errorCodes.jwtMissing) {
            setIsLogged(false)
            setIsAppReady(true) 
          }
        })
      } else {
        setTimeout(() => {
          setIsAppReady(true)
        }, 3000);
      }
}, [existToken]);

  return (
    <View style={styles.splashContainer}>
      <Text style={styles.splashText}>Welcome to MyApp</Text>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.moodyBlack,
  },
  splashText: {
    fontSize: 24,
    color: Colors.white,
    marginBottom: 20,
  },
});

export default SplashScreen;
