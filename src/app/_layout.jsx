import React, { useEffect, useState } from "react";
import { Redirect, Slot, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import SplashScreen from "./SplashScreen";
import AppProvider from ".";
import { getAllAuthData, getAuthData, initializeDatabase } from "../utils/database";
import { ACCESS_TOKEN } from "../utils/storageKeys";
import { Provider, useDispatch } from "react-redux";
import KshirsaStore from "../redux/store";
import Colors from "../styles/Colors";
import { SafeAreaView } from "react-native";
import { setupInterceptors } from "../api/api";
import { AlertNotificationRoot } from "react-native-alert-notification";
import AlertComponent from "../small-components/KshirsaAlert";
import useDeviceId from "../hooks/useDeviceId";
import KshirsaFloatingBtn from "../small-components/KshirsaFloatingBtn";
import apiRoutes from "../constants/apiRoutes";
import { setButtonState } from "../redux/reducers/floatingBtnReducer";

export default function RootLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const deviceId = useDeviceId();
  const visibleFloatingBtn = pathname !== "/login" && pathname !== "/register" && pathname !== '/';

  useEffect(() => {
    // Initialize SQLite database
     initializeDatabase();

  }, []);

  useEffect(() => {
   setTimeout(() => {
    getAllAuthData()
   }, 4000);
  }, []);

  useEffect(() => {
    setupInterceptors(router, deviceId);
  }, [router]);

  return (
    <SafeAreaView style={{flex: 1, backgrounfColor: Colors.moodyBlack}}>
    <Provider store={KshirsaStore}>
      <AlertNotificationRoot>
      <StatusBar backgroundColor={Colors.secondary} />
      <Slot />
      <AlertComponent />
      </AlertNotificationRoot>
      {visibleFloatingBtn && <KshirsaFloatingBtn onPress={() => router.push(apiRoutes.addTransaction)}
      />}
    </Provider>
    </SafeAreaView>
  )
}