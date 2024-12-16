import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect, Stack } from 'expo-router'
import * as splashScreen from 'expo-splash-screen'

splashScreen.preventAutoHideAsync()
const RootLayout = () => {
  const [isLogin, setIslogin] = useState(false)

  useEffect(() => {
    splashScreen.hideAsync()
  }, [])

  return (
   <>
   <Stack screenOptions={{ headerShown: false}} />
   <Redirect to={isLogin ? '/(main)' : '/(auth)'} />
   </>
  )
}

export default RootLayout