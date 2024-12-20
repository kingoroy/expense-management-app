import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import kshirsaButtonStyles from '../styles/StylesKshirsaButton'
import cssUtils from '../constants/cssUtils'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../styles/Colors'

const KshirsaButton = ({ title = 'button', buttonStyle, titleStyle, onPress }) => {
    return (
        <TouchableOpacity  onPress={onPress} activeOpacity={cssUtils.buttonOpacity}>
            <LinearGradient colors={Colors.buttonLinearGradient} style={[kshirsaButtonStyles.container, buttonStyle, onPress]}>
                <Text style={[kshirsaButtonStyles.text, titleStyle]}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default KshirsaButton

