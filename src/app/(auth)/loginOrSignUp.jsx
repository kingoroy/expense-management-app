import { View, Text, Image, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import imagePath from '../../constants/imagePath'
import logoStyles from '../../styles/logoStyles'
import loginOrSignupStyles from '../../styles/stylesLoginOrSignup'
import KshirsaButton from '../../small-components/KshirsaButton'
import KshirsaInput from '../../small-components/KshirsaInput'
import { STANDARD_EMAIL_REGEX } from '../../constants/utils'
import { EMPTY_EMAIL, INVALID_FORMAT_EMAIL } from '../../constants/validationMessage'
import { router } from 'expo-router'
import apiRoutes from '../../constants/apiRoutes'

const LoginOrSignUp = () => {
  const [email, setEmail] = useState({
    value: '',
    isValid: false,
    errorMessage: ''
  })
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const handleEmailChange = (text) => {
    setEmail((prev)=>{return {...prev, value: text}})
 if(STANDARD_EMAIL_REGEX.test(text)) {
   setEmail({
      value: text,
     isValid: true,
     errorMessage: ''
   })
  }else {
      setEmail({
        value: text,
        isValid: false,
        errorMessage: INVALID_FORMAT_EMAIL
      })
   }
  }

  const handleNextClick = () => {
    // if(email.value === '') {
    //   setEmail({
    //     ...email.value,
    //     isValid: false,
    //     errorMessage: EMPTY_EMAIL
    //   }) 
    // } else if(!email.isValid && email.value !== '') {
    //   setEmail({
    //     ...email.value,
    //     isValid: false,
    //     errorMessage: INVALID_FORMAT_EMAIL
    //   })
    // } else {
    //   setEmail({
    //     ...email.value,
    //     isValid: true,
    //     errorMessage: ''
    //   })
      router.navigate(apiRoutes.otp)
    // }
  }
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <View style={loginOrSignupStyles.mainContainer}>
    <View style={loginOrSignupStyles.container}>
     <Image source={imagePath.logoPath} style={logoStyles.mediumLogo} />
     <View style={loginOrSignupStyles.titleTextsWrapper}>
     <Text style={loginOrSignupStyles.titleText}>Track your money like a pro! Enter your email to begin.</Text>
     </View>
     <KshirsaInput 
     onChangeText={handleEmailChange}
     value={email}
     needSuccessSymbol={true}
     isValid={email.isValid}
     errorMessage={email.errorMessage}
     type='email'
     />
    </View>
    <View style={loginOrSignupStyles.buttonWrapper}>
    <Text style={loginOrSignupStyles.verifyText}>Kshirsa will be verifying your email for a secure experience.</Text>
     <KshirsaButton title='Next' onPress={handleNextClick} disabled={true} />
    </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default LoginOrSignUp