import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../styles/Colors';

// This variable will hold the function to update the alert state
let alertHandler = null;

const AlertComponent = () => {
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: '',
    message: '',
    buttons: [],
  });

  useEffect(() => {
    // Assign the setAlertConfig function to alertHandler
    alertHandler = setAlertConfig;
  }, []);

  const closeModal = () => {
    setAlertConfig((prev) => ({ ...prev, visible: false }));
  };

  if (!alertConfig.visible) return null;

  return (
    <Modal transparent animationType="fade" visible={alertConfig.visible}>
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          {alertConfig.title && <Text style={styles.alertTitle}>{alertConfig.title}</Text>}
          {alertConfig.message && <Text style={styles.alertMessage}>{alertConfig.message}</Text>}
          <View style={styles.buttonContainer}>
            {alertConfig.buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  button.style === 'cancel' ? styles.cancelButton : styles.defaultButton,
                ]}
                onPress={() => {
                  button.onPress && button.onPress();
                  closeModal();
                }}
              >
                <Text style={styles.buttonText}>{button.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Exported function to trigger the alert
export const KshirsaAlert = {
  alert: (title, message, buttons = [{ text: 'OK' }]) => {
    if (alertHandler) {
      alertHandler({
        visible: true,
        title,
        message,
        buttons,
      });
    } else {
      console.error('Alert handler is not initialized.');
    }
  },
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    width: '80%',
    backgroundColor: Colors.normalInputBg,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: Colors.secondary,
  },
  alertMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: Colors.white,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  defaultButton: {
    backgroundColor: Colors.secondary,
  },
  cancelButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
});

export default AlertComponent;
