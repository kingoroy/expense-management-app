import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import Colors from '../styles/Colors';
import cssUtils from '../constants/cssUtils';

const KshirsaOtpInput = ({ numberOfDigits = 4, onOTPComplete }) => {
  const [otp, setOtp] = useState(Array(numberOfDigits).fill(''));
  const inputs = useRef([]);

  useEffect(() => {
    console.log('mount')
    return () => {
      console.log('remove')
      setOtp('');
    }
  }, [])
  
  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < numberOfDigits - 1) {
      inputs.current[index + 1].focus();
    }

    if (newOtp.every((digit) => digit !== '') && newOtp.length === numberOfDigits) {
      onOTPComplete(newOtp.join(''));
      setOtp(new Array(numberOfDigits).fill(''));
    }
  };

  const handleKeyPress = ({ nativeEvent: { key } }, index) => {
    if (key === 'Backspace') {
      const newOtp = [...otp];
      if (!otp[index] && index > 0) {
        inputs.current[index - 1].focus();
        newOtp[index - 1] = '';
      } else {
        newOtp[index] = '';
      }
      setOtp(newOtp);
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => {
        return (
            <TextInput
              key={index}
              style={[
                styles.input,
                otp[index] !== '' && styles.highlight
              ]}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              ref={(ref) => (inputs.current[index] = ref)}
            />
        )
})}
    </View>
  );
};

export default KshirsaOtpInput

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: Colors.normalInputBg,
    fontSize: cssUtils.mediumTextSize,
    textAlign: 'center',
    width: 40,
    marginHorizontal: 5,
    color: Colors.white
  },
  highlight: {
    borderColor: Colors.secondary,
  }
});

