import React, { useState } from "react";
import { Redirect, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import SplashScreen from "./SplashScreen";
import { getTokenSync } from "../utils/storage";
import AppProvider from ".";

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const existToken = getTokenSync();
  const redirectToAuth = existToken ? isLogged : true;

  return (
    <AppProvider>
      {isAppReady ? (
        <>
          <Slot />
          <Redirect href={redirectToAuth ? "(auth)/getStarted" : "(main)/home"} />
          <StatusBar backgroundColor="black" />
        </>
      ) : (
        <SplashScreen
          existToken={existToken}
          setIsLogged={setIsLogged}
          setIsAppReady={setIsAppReady}
        />
      )}
    </AppProvider>
  );
}
