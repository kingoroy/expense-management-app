import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { addTransactionStyles } from '../../styles/stylesAddTransaction'
import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons'
import Colors from '../../styles/Colors'

const TransactionNotes = () => {
  return (
    <View style={addTransactionStyles.transactionNotesContainer}>
      <View style={addTransactionStyles.leftSideNotes}>
        <TextInput
        placeholder='Notes'
        style={addTransactionStyles.notesInput}
        placeholderTextColor={Colors.white}
        multiline={true}
         />
      </View>
      <View style={addTransactionStyles.rightSideNotes}>
      <MaterialIcons name="notes" size={24} color={Colors.white} />
      </View>
    </View>
  )
}

export default TransactionNotes