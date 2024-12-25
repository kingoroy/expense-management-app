import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import { KeyboardAvoidingView } from 'react-native-web'

const UseTouchableWithoutFeedback = ({children}) => {
  return (
   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
    </TouchableWithoutFeedback>
  )
}

export default UseTouchableWithoutFeedback

export const UseKeyboardAvoidingView = ({Children}) => {
  return (
   <KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
    {Children}
    </KeyboardAvoidingView>
  )
}