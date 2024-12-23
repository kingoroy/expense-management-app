import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Redirect, Stack } from 'expo-router';
import * as splashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import Colors from '../styles/Colors';
// import { AppProvider, useFontLoaded } from '../path-to-your-fonts-file'; // Adjust the path
import AppProvider from './AppProvider';
import { getFonts, useFontLoaded } from '../constants/fonts';
import { Provider } from 'react-redux';
import store from '../redux/store';

splashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    splashScreen.hideAsync();
  }, []);
console.log('font', getFonts.CinzeRegular)
  return (
    <AppProvider>
      <KeyboardAvoidingView
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        style={{ flex: 1, backgroundColor: Colors.moodyBlack }}
      >
        <Stack screenOptions={{ headerShown: false }}>
          <StatusBar backgroundColor={Colors.moodyBlack} />
          <Redirect to={isLogin ? '/(main)' : '/(auth)'} />
        </Stack>
      </KeyboardAvoidingView>
    </AppProvider>
  );
};

