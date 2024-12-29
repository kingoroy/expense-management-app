import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  BackHandler,
  Alert,
  Image,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import registrationStyles from '../../styles/stylesRegistration';
import KshirsaButton from '../../small-components/KshirsaButton';
import KshirsaInput from '../../small-components/KshirsaInput';
import UseTouchableWithoutFeedback from '../../hooks/useTouchableWithoutFeedback';
import StepIndicator from '../../small-components/KshirsaStepIndicator';
import imagePath from '../../constants/imagePath';
import logoStyles from '../../styles/logoStyles';
import uiText from '../../constants/uiTexts';
import CountryPicker from 'react-native-country-picker-modal'
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../styles/Colors';
import { EMPTY_DOB, EMPTY_NAME, EMPTY_PHONE_NUMBER, INVALID_FORMAT_PHONE_NUMBER } from '../../constants/validationMessage';

const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [visibleCountryPicker, setVisibleCountryPicker] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');
  const [fullName, setFullName] = useState({
    value: '',
    isValid: false,
    errorMessage: ''
  })
  const [phoneNumber, setPhoneNumber] = useState({
    value: '',
    isValid: false,
    errorMessage: ''
  })
  const [dateOfBirth, setDateOfBirth] = useState({
    value: '',
    isValid: false,
    errorMessage: ''
  })

  useEffect(()=> {
    return () => {
      Keyboard.dismiss()
    }
  },[step])
  const handleChange = (name, value) => {
    switch (name) {
      case 'fullName':
        setFullName({
          value: value,
          isValid: value.length > 0,
          errorMessage: value.length > 0 ? '' : EMPTY_NAME
        })
        break;
      case 'phoneNumber':
        setPhoneNumber({
          value: value,
          isValid: value.length > 0 && value.length === 10,
          errorMessage: value.length === 0 ? EMPTY_PHONE_NUMBER : value.length < 10 ? INVALID_FORMAT_PHONE_NUMBER : ''
        })
        break;
      case 'dateOfBirth':
        setDateOfBirth({
          value: value,
          isValid: value.length > 0,
          errorMessage: value.length > 0 ? '' : EMPTY_DOB
        })
        break;
      default:
        break;
    }
  }
  useEffect(() => {
    const handleBackPress = () => {
      if (step > 1) {
        setStep((prevStep) => prevStep - 1);
        return true;
      } else {
        Alert.alert(
          'Exit Registration',
          'Are you sure you want to exit the registration process?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Exit', onPress: () => router.replace('/(auth)') },
          ]
        );
        return true;
      }
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [step]);

  const handleNextClick = () => {
    switch (step) {
      case 1:
        if (fullName.value === '') {
          setFullName({
            ...fullName,
            isValid: false,
            errorMessage: 'Name is required'
          })
        } else {
          setFullName({
            ...fullName,
            isValid: true,
            errorMessage: ''
          })
          setStep((prev) => prev + 1)
        }
        break;
      case 2:
        if (phoneNumber.value === '') {
          setPhoneNumber({
            ...phoneNumber,
            isValid: false,
            errorMessage: 'Phone number is required'
          })
        } else {
          setPhoneNumber({
            ...phoneNumber,
            isValid: true,
            errorMessage: ''
          })
          setStep((prev) => prev + 1)
        }
        break;
      case 3:
        if (dateOfBirth.value === '') {
          setDateOfBirth({
            ...dateOfBirth,
            isValid: false,
            errorMessage: 'Date of birth is required'
          })
        } else {
          setDateOfBirth({
            ...dateOfBirth,
            isValid: true,
            errorMessage: ''
          })
        }
        break;
      default:
        break;
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <UseTouchableWithoutFeedback>
            <View style={registrationStyles.stepContainer}>
              <Text style={registrationStyles.label}>Enter your full name</Text>
              <KshirsaInput
                style={registrationStyles.input}
                placeholder="Full Name"
                value={fullName.value}
                type='name'
                name='fullName'
                onChangeText={(value) => handleChange('fullName', value)}
                isValid={fullName.isValid}
                errorMessage={fullName.errorMessage}
                needSuccessSymbol={true}
              />
            </View>
          </UseTouchableWithoutFeedback>
        );
      case 2:
        return (
          <UseTouchableWithoutFeedback>
            <View style={registrationStyles.stepContainer}>
              <TouchableOpacity style={registrationStyles.selectCountrywrapper} onPress={() => setVisibleCountryPicker(true)}>
                <View></View>
                <Text style={registrationStyles.label}>({selectedCountryCode}) {selectedCountry.toUpperCase()}</Text>
                <AntDesign name="caretdown" size={14} color={Colors.white} />
              </TouchableOpacity>
              <KshirsaInput
                style={registrationStyles.input}
                placeholder={uiText.PHONE_NUMBER}
                keyboardType="phone-pad"
                value={phoneNumber.value}
                type='phone'
                name='phoneNumber'
                onChangeText={(value) => handleChange('phoneNumber', value)}
                isValid={phoneNumber.isValid}
                errorMessage={phoneNumber.errorMessage}
                needSuccessSymbol={true}

              />
              {visibleCountryPicker &&
                <CountryPicker
                  visible={true}
                  onClose={() => setVisibleCountryPicker(false)}
                  onSelect={(country) => {
                    setSelectedCountry(country.name)
                    setSelectedCountryCode(` +${country.callingCode[0]} `)
                  }}
                  theme={registrationStyles.countryPickerTheme}
                />}
            </View>
          </UseTouchableWithoutFeedback>
        );
      case 3:
        return (
          <UseTouchableWithoutFeedback>
            <View style={registrationStyles.stepContainer}>
              <Text style={registrationStyles.label}>Enter your date of birth</Text>
              <KshirsaInput
                style={registrationStyles.input}
                placeholder="Date of Birth (YYYY-MM-DD)"
                value={dateOfBirth.value}
                type='dob'
                name='dateOfBirth'
                onChangeText={(value) => handleChange('dateOfBirth', value)}
                isValid={dateOfBirth.isValid}
                errorMessage={dateOfBirth.errorMessage}
              />
            </View>
          </UseTouchableWithoutFeedback>
        );
      default:
        return null;
    }
  };

  return (
    <UseTouchableWithoutFeedback>
      <SafeAreaView style={registrationStyles.container}>
        <StepIndicator
          currentStep={step}
          totalSteps={3}
          onStepPress={(step) => setStep(step)}
        />
        <View style={registrationStyles.body}>
          <Image source={imagePath.logoPath} style={logoStyles.mediumLogo} />
          {/* <Text style={registrationStyles.signupTitle}>{uiText.SIGNUP_TITLE}</Text> */}
          {renderStep()}
        </View>
        <View style={registrationStyles.buttonContainer}>
          {step < 3 ? (
            <KshirsaButton title="Next" onPress={handleNextClick} />
          ) : (
            <KshirsaButton
              title="Submit"
              onPress={handleNextClick}
            />
          )}
        </View>
      </SafeAreaView>
    </UseTouchableWithoutFeedback>
  );
};

export default RegisterForm;
