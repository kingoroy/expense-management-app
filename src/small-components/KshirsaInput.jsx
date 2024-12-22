import { View, Text, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import kshirsaButtonStyles from '../styles/stylesKshirsaInput'
import Colors from '../styles/Colors'
import { Fontisto, Ionicons } from '@expo/vector-icons'

const KshirsaInput = ({
  value='', 
  errorMessage='no error',
   style='',
   isValid=false, 
   needErrorMsg=true, 
   needSuccessSymbol=false,
   placeholder='Enter your email',
   needErrorStyle=false,
   onChangeText=()=>{}
   }) => {
  const [isFocused, setIsFocused] = useState(false)
  const success = isValid && needSuccessSymbol
  const focusWithNotSuccess = !isValid && isFocused
  const errorStyles = needErrorStyle && !isFocused;
  const labelColor = success ? Colors.secondary : focusWithNotSuccess ? Colors.infoBlue : errorStyles ? Colors.red :  Colors.white
  return (
      <View>
        <View style={[kshirsaButtonStyles.container, kshirsaButtonStyles.normalInputWrapper, style, errorStyles && kshirsaButtonStyles.errorInputWrapper]}>
          <View style={kshirsaButtonStyles.LablelWrapper}>
            <Fontisto name="email" size={24} color={labelColor} />
          </View>
          <TextInput
            style={[kshirsaButtonStyles.input, success ? kshirsaButtonStyles.successInput : kshirsaButtonStyles.normalInput]} placeholder={placeholder}
            placeholderTextColor={Colors.white}
            onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          onChangeText={onChangeText}
          />
          <View style={kshirsaButtonStyles.checkWrapper}>
          {success &&  <Ionicons name="checkmark-done" size={24} color={Colors.secondary} />}
          </View>
        </View>
       {!isValid && needErrorMsg && <Text style={kshirsaButtonStyles.errorText}>{errorMessage}</Text>}
        </View>
  )
}

export default KshirsaInput