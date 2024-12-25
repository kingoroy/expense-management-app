import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import imagePath from '../../constants/imagePath';
import logoStyles from '../../styles/logoStyles';
import loginOrSignupStyles from '../../styles/stylesLoginOrSignup';
import KshirsaButton from '../../small-components/KshirsaButton';
import KshirsaInput from '../../small-components/KshirsaInput';
import { STANDARD_EMAIL_REGEX } from '../../constants/utils';
import { INVALID_FORMAT_EMAIL } from '../../constants/validationMessage';
import { router } from 'expo-router';
import apiRoutes from '../../constants/apiRoutes';
import Colors from '../../styles/Colors';

const LoginOrSignUp = () => {
  const [email, setEmail] = useState({
    value: '',
    isValid: false,
    errorMessage: '',
  });

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleEmailChange = (text) => {
    setEmail((prev) => ({ ...prev, value: text }));
    if (STANDARD_EMAIL_REGEX.test(text)) {
      setEmail({
        value: text,
        isValid: true,
        errorMessage: '',
      });
    } else {
      setEmail({
        value: text,
        isValid: false,
        errorMessage: INVALID_FORMAT_EMAIL,
      });
    }
  };

  const handleNextClick = () => {
    router.navigate(apiRoutes.otp);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, backgroundColor: Colors.moodyBlack }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={loginOrSignupStyles.mainContainer}>
            <View style={loginOrSignupStyles.container}>
              <Image source={imagePath.logoPath} style={logoStyles.mediumLogo} />
              <View style={loginOrSignupStyles.titleTextsWrapper}>
                <Text style={loginOrSignupStyles.titleText}>
                  Track your money like a pro! Enter your email to begin.
                </Text>
              </View>
              <KshirsaInput
                onChangeText={handleEmailChange}
                value={email.value}
                needSuccessSymbol={true}
                isValid={email.isValid}
                errorMessage={email.errorMessage}
                type="email"
              />
            </View>
            <View style={{ marginBottom: Platform.OS === 'ios' ? 20 : 0 }} />
          </View>
        </ScrollView>
        <View style={loginOrSignupStyles.buttonWrapper}>
          <Text style={loginOrSignupStyles.verifyText}>
            Kshirsa will be verifying your email for a secure experience.
          </Text>
          <KshirsaButton
            title="Next"
            onPress={handleNextClick}
            disabled={!email.isValid}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginOrSignUp;
