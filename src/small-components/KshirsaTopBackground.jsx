import { View, Text, Image } from 'react-native'
import React from 'react'
import { StyleSheet } from "react-native";
import Colors from '../styles/Colors';
import useGetCurrentTimeDetails from '../hooks/useGetCurrentTimeDetails';

const KshirsaTopBackground = () => {
    const { greeting, image } = useGetCurrentTimeDetails();
  return (
    <View style={[KshirsaTopBgStyles.container, KshirsaTopBgStyles.welcomeContainer]}>
        <Image source={image} resizeMode="cover" style={[KshirsaTopBgStyles.container, KshirsaTopBgStyles.welcomeContainer]} />
    </View>
  )
}

export default KshirsaTopBackground


const KshirsaTopBgStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.secondary,
        height: 250,
        transform: [{ scaleX: 1.3 }],
        position: 'absolute',
        width: '100%',
        borderBottomRightRadius: 350,
        borderBottomLeftRadius: 350,
    }
    });