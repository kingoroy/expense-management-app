import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { otpStyles } from '../../styles/stylesOtp'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../styles/Colors'
import uiText from '../../constants/uiTexts'
import KshirsaOtpInput from '../../small-components/KshirsaOtpInput'
import UseTouchableWithoutFeedback from '../../hooks/useTouchableWithoutFeedback'
import useCountdownTimer from '../../hooks/UseCountdownTimer'
import KshirsaButton from '../../small-components/KshirsaButton'
import logoStyles from '../../styles/logoStyles'
import imagePath from '../../constants/imagePath'
import { router } from 'expo-router'

const Otp = () => {
    const countDown = useCountdownTimer(10)
	const handleOtpComplete = (otp) => {
		console.log(otp)
		router.navigate('registration')
	}

	return (
		<UseTouchableWithoutFeedback>
		<SafeAreaView style={otpStyles.container}>
     <View style={otpStyles.header}>
		<TouchableOpacity onPress={router.back}>
		 <Ionicons name="arrow-back" size={24} color={Colors.white} />
		 </TouchableOpacity>
		 <Text style={otpStyles.headerText}>{uiText.ENTER_OTP}</Text>
		 </View>
		 <View style={otpStyles.body}>
		 <Image source={imagePath.logoPath} style={logoStyles.bigLogo} />
			<Text style={otpStyles.otpTexts}>{uiText.OTP_SENT}<Text> test@test.com</Text></Text>
           <KshirsaOtpInput 
		   onOTPComplete={handleOtpComplete}
		   />
		 </View>
		 <View style={otpStyles.footer}>
		 {countDown===0 ?
		<KshirsaButton title={uiText.RESEND_OTP_BTN} /> :
		<Text style={otpStyles.otpTexts}>{uiText.RESENT_OTP_IN} {countDown}s</Text>}
		 </View>
		</SafeAreaView>
		</UseTouchableWithoutFeedback>
	)
}

export default Otp
