import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'

const UseTouchableWithoutFeedback = ({children}) => {
  return (
   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
    </TouchableWithoutFeedback>
  )
}

export default UseTouchableWithoutFeedback