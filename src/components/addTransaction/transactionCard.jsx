import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { addTransactionStyles } from '../../styles/stylesAddTransaction';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../styles/Colors';
import { TextInput } from 'react-native';
import cssUtils from '../../constants/cssUtils';
import KshirsaPopup from '../../small-components/KshirsaPopup';
import TransactionPaymentModePopup from './transactionPaymentModePopup';
import CashIcon from '../../../assets/icons/cashIcon';
import UpiIcon from '../../../assets/icons/upiIcon';
import paymentModeOptions from '../../constants/paymentModeOptions';

const TransactionCard = ({ formData, onChange, setFormData }) => {
  const [visiblePaymenetModePopup, setVisiblePaymentModePopup] = useState(false);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState(paymentModeOptions[0]);

  const handleTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      transactionType: type,
    }));
  };

  const rupeesIconAndAmountFontSize = () => {
    const length = formData.amount.length;
    if (length >= 0 && length <= 5) {
      return cssUtils.bigTextSize;
    } else {
      return cssUtils.mediumTextSize;
    }
  };


  return (
    <>
      <View style={addTransactionStyles.transactionCardContainer}>
        <View style={addTransactionStyles.transactionType}>
          <TouchableOpacity onPress={() => handleTypeChange('EXPENSE')} style={{ flex: 1 }}>
            <Text
              style={[
                addTransactionStyles.transactionTypeText,
                formData?.transactionType === 'EXPENSE' && addTransactionStyles.transactionTypeFocus,
              ]}
            >
              EXPENSE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTypeChange('INCOME')} style={{ flex: 1 }}>
            <Text
              style={[
                addTransactionStyles.transactionTypeText,
                formData?.transactionType === 'INCOME' && addTransactionStyles.transactionTypeFocus,
              ]}
            >
              INCOME
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTypeChange('LOAN')} style={{ flex: 1 }}>
            <Text
              style={[
                addTransactionStyles.transactionTypeText,
                formData?.transactionType === 'LOAN' && addTransactionStyles.transactionTypeFocus,
              ]}
            >
              LOAN
            </Text>
          </TouchableOpacity>
        </View>
        <View style={addTransactionStyles.cardBody}>
          <View style={addTransactionStyles.amountWrapper}>
            <Text style={[addTransactionStyles.rupeesText, { fontSize: rupeesIconAndAmountFontSize() }]}>₹</Text>
            <TextInput
              placeholder='0.00'
              keyboardType='numeric'
              autoFocus={true}
              onChangeText={(text) => onChange('amount', text)}
              value={formData.amount}
              style={[addTransactionStyles.amountInput, { fontSize: rupeesIconAndAmountFontSize() }]}
              placeholderTextColor={Colors.white}
              maxLength={10}
            />
          </View>
          <View style={addTransactionStyles.paymentModeContainer}>
            <Text style={{ color: Colors.white }}>Payment Mode</Text>
            <TouchableOpacity
              style={addTransactionStyles.paymentModeWrapper}
              onPress={() => setVisiblePaymentModePopup(true)}
            >
              {selectedPaymentMode?.icon}
              <Text style={{ color: Colors.white }}>{selectedPaymentMode?.label}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TransactionPaymentModePopup visiblePaymentModePopup={visiblePaymenetModePopup} setVisiblePaymentModePopup={setVisiblePaymentModePopup} setSelectedPaymentMode={setSelectedPaymentMode} setFormData={setFormData} />
    </>
  );
};

export default TransactionCard;
