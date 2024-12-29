import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { otpStyles } from '../../styles/stylesOtp';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../styles/Colors';
import uiText from '../../constants/uiTexts';
import KshirsaOtpInput from '../../small-components/KshirsaOtpInput';
import UseTouchableWithoutFeedback from '../../hooks/useTouchableWithoutFeedback';
import useCountdownTimer from '../../hooks/UseCountdownTimer';
import KshirsaButton from '../../small-components/KshirsaButton';
import logoStyles from '../../styles/logoStyles';
import imagePath from '../../constants/imagePath';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import validateOtpAction from '../../redux/actions/validateOtpAction';
import generateOtpAction from '../../redux/actions/generateOtpAction';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCESS_TOKEN } from '../../utils/storageKeys';

const MAX_ATTEMPTS = 3;

const Otp =  () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.generateOtpReducer.data?.email);

  const [attempts, setAttempts] = useState(0); 
  const [timerDuration, setTimerDuration] = useState(30);
  const countDown = useCountdownTimer(timerDuration);

  const handleOtpComplete = (otp) => {
    const body = {
      email,
      otp,
    };
    dispatch(validateOtpAction({ body })).unwrap()
	  .then((res) => {
		Toast.show({
			type: ALERT_TYPE.SUCCESS,
			title: 'Success',
			textBody: uiText.LOGIN_SUCCESS,
		  })
      console.log(res, 'res') // eslint-disable-line
	  })
	  .catch(() => {
    })
  }
  // console.log(await AsyncStorage.getItem(ACCESS_TOKEN), 'token') // eslint-disable-line

  const handleResendBtn = () => {
    if (attempts >= MAX_ATTEMPTS) {
      return;
    }
    dispatch(generateOtpAction({ queryParams: { email } }))
      .unwrap()
      .then(() => {
		Toast.show({
			type: ALERT_TYPE.SUCCESS,
			title: 'Success',
			textBody: uiText.OTP_SEND_SUCCESS,
		  })
        setAttempts(attempts + 1);
        const newDuration = timerDuration * 2;
        setTimerDuration(newDuration);
      })
      .catch(() => {
      });
  };

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
          <Text style={otpStyles.otpTexts}>
            {uiText.OTP_SENT}
            <Text>{email}</Text>
          </Text>
          <KshirsaOtpInput onOTPComplete={handleOtpComplete} />
        </View>
        <View style={otpStyles.footer}>
          {attempts >= MAX_ATTEMPTS ? (
            <Text style={otpStyles.errorText}>
              {uiText.MAXIMUM_RESEND_ATTEMPTS}
            </Text>
          ) : countDown === 0 ? (
            <KshirsaButton
              title={uiText.RESEND_OTP_BTN}
              onPress={handleResendBtn}
            />
          ) : (
            <Text style={otpStyles.otpTexts}>
              {uiText.RESENT_OTP_IN} {countDown}s
            </Text>
          )}
        </View>
      </SafeAreaView>
    </UseTouchableWithoutFeedback>
  );
};

export default Otp;
