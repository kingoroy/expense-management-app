import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { resetButtonState, setButtonState } from '../../redux/reducers/floatingBtnReducer';
import { useDispatch } from 'react-redux';

const AddTransaction = () => {
  const [amount, setAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('CASH');
  const [note, setNote] = useState('');
  const [transactionType, setTransactionType] = useState('EXPENSE');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [transactionTime, setTransactionTime] = useState(new Date());
  const [categoryId, setCategoryId] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [tags, setTags] = useState(['']);
  const dispatch = useDispatch();

  useEffect(() => {
    // Change the floating button to "Save" mode when on this page
    dispatch(
      setButtonState({
        visible: true,
        icon: "save", // Icon for save
        btnStyles: { bottom: 40, left: '80%' }, // Adjusted position
        onPress: null, // Save transaction handler
      })
    );
    return () => {
      dispatch(resetButtonState());
    };
  }, []);
  const handleSubmit = () => {
    const transactionData = {
      amount: parseFloat(amount),
      paymentMode,
      note,
      transactionType,
      transactionTime: transactionTime.toISOString(),
      categoryId,
      isRecurring,
      tags,
    };
    console.log(transactionData);
    // Handle submission logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Transaction</Text>

      {/* Amount Input */}
      <Text>Amount</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter amount"
      />

      {/* Payment Mode Picker */}
      <Text>Payment Mode</Text>
      <Picker
        selectedValue={paymentMode}
        onValueChange={setPaymentMode}
        style={styles.input}
      >
        <Picker.Item label="Cash" value="CASH" />
        <Picker.Item label="Card" value="CARD" />
        <Picker.Item label="Bank Transfer" value="BANK_TRANSFER" />
      </Picker>

      {/* Note Input */}
      <Text>Note</Text>
      <TextInput
        style={styles.input}
        value={note}
        onChangeText={setNote}
        placeholder="Enter note"
      />

      {/* Transaction Type Picker */}
      <Text>Transaction Type</Text>
      <Picker
        selectedValue={transactionType}
        onValueChange={setTransactionType}
        style={styles.input}
      >
        <Picker.Item label="Expense" value="EXPENSE" />
        <Picker.Item label="Income" value="INCOME" />
      </Picker>

      {/* Transaction Time Picker */}
      <Text>Transaction Time</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.input}>{transactionTime.toLocaleString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
       <DateTimePickerAndroid
       value={date}
       mode="date"
       display="default"
       onChange={handleDateChange}
       maximumDate={new Date()}
     />
      )}

      {/* Category Input */}
      <Text>Category</Text>
      <TextInput
        style={styles.input}
        value={categoryId}
        onChangeText={setCategoryId}
        placeholder="Enter category ID"
      />

      {/* Recurring Switch */}
      <Text>Is Recurring</Text>
      <Switch
        value={isRecurring}
        onValueChange={setIsRecurring}
      />

      {/* Tags Input */}
      <Text>Tags</Text>
      <TextInput
        style={styles.input}
        value={tags[0]}
        onChangeText={(text) => setTags([text])}
        placeholder="Enter tags"
      />

      {/* Submit Button */}
      <Button title="Add Transaction" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
});

export default AddTransaction;
