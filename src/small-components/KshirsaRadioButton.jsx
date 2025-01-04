import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../styles/Colors';

const KshirsaRadioButton = ({
  options = ['Yes', 'No'], // Default options are 'Yes' and 'No'
  selectedValue,
  onValueChange,
  containerStyle,
  buttonStyle,
  textStyle,
}) => {

  const handlePress = (value) => {
    if (onValueChange) {
      onValueChange(value); // Notify parent component about the change
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.button,
            buttonStyle,
            selectedValue === option && styles.selectedButton,
          ]}
          onPress={() => handlePress(option)}
        >
          <View
            style={[
              styles.radioCircle,
              selectedValue === option && styles.selectedCircle,
            ]}
          />
          <Text style={[styles.text, textStyle]}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.white,
    marginRight: 10,
  },
  selectedCircle: {
    backgroundColor: Colors.primary,
  },
  selectedButton: {
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  text: {
    fontSize: 16,
    color: Colors.white,
  },
});

export default KshirsaRadioButton;
