import { Image, SafeAreaView, Text, TextInput, View } from 'react-native'
import React from 'react'
import { GetStartedScreenStyles } from '../../styles/StylesGetStartedScreen'
import Colors from '../../styles/Colors'
import KshirsaButton from '../../small-components/KshirsaButton'
import { useRouter } from 'expo-router'
import apiRoutes from '../../constants/apiRoutes'
import imagePath from '../../constants/imagePath'
import logoStyles from '../../styles/logoStyles'


const GetStartedScreen = () => {
  const router = useRouter()
  const handleGetStarted =()=> {
    router.push(apiRoutes.loginOrSignup)
  }
  return (
    <SafeAreaView style={GetStartedScreenStyles.container}>
      <View style={{}}></View>
      <View style={GetStartedScreenStyles.body}>
        <Image source={imagePath.logoPath} style={logoStyles.bigLogo} />
        <Text style={logoStyles.bigLogoText}>Kshirsa</Text>
        </View>
      <View style={GetStartedScreenStyles.footer}>
        <View style={GetStartedScreenStyles.oneLinerWrapper}>
        <Text style={GetStartedScreenStyles.oneLinerText}>Spend Smarter Save More</Text>
        </View>
        <KshirsaButton title='Get Started' onPress={handleGetStarted} />
      </View>
    </SafeAreaView>
  )
}

export default GetStartedScreen
