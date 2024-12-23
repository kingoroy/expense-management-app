import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import kshirsaStepIndicatorStyles from '../styles/stylesKshirsaStepIndicator';

const StepIndicator = ({ currentStep, totalSteps, onStepPress }) => {
  const steps = Array.from({ length: totalSteps }, (_, index) => index + 1);

  return (
    <View style={kshirsaStepIndicatorStyles.container}>
      {steps.map((step) => (
        <View key={step} style={kshirsaStepIndicatorStyles.stepContainer}>
          <TouchableOpacity
            style={[
              kshirsaStepIndicatorStyles.step,
              step === currentStep && kshirsaStepIndicatorStyles.activeStep,
              step < currentStep && kshirsaStepIndicatorStyles.completedStep,
              step > currentStep && kshirsaStepIndicatorStyles.disabledStep,
            ]}
            onPress={() => step < currentStep && onStepPress(step)}
            disabled={step > currentStep}
          >
            <Text
              style={[
                kshirsaStepIndicatorStyles.stepText,
                step === currentStep && kshirsaStepIndicatorStyles.activeText,
                step < currentStep && kshirsaStepIndicatorStyles.completedText,
                step > currentStep && kshirsaStepIndicatorStyles.disabledText,
              ]}
            >
              {step}
            </Text>
          </TouchableOpacity>
          {step < totalSteps && 
          <View style={[
            kshirsaStepIndicatorStyles.line,
            kshirsaStepIndicatorStyles.completedText,
            ]} />}
        </View>
      ))}
    </View>
  );
};



export default StepIndicator;
