import { StyleSheet } from "react-native";
import Colors from "./Colors";
import cssUtils from "../constants/cssUtils";

const kshirsaStepIndicatorStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
},
  stepContainer: {
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'row',
  },
  step: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BDBDBD',
  },
  activeStep: {
    backgroundColor: Colors.white, // Green for active step
    borderColor: Colors.secondary,
    borderWidth: 5
  },
  completedStep: {
    backgroundColor: Colors.secondary, // Blue for completed step
  },
  disabledStep: {
    backgroundColor: '#E0E0E0', // Light gray for disabled step
  },
  stepText: {
    color: '#fff',
},
activeText: {
    fontWeight: cssUtils.bold,
    color: Colors.primary,
  },
  completedText: {
    fontWeight: cssUtils.bold,
    color: Colors.white,
  },
  disabledText: {
    color: '#757575', // Gray text for disabled steps
  },
  line: {
    width: 50,
    height: 2,
    backgroundColor: '#BDBDBD',
},
completedLine: {
      backgroundColor: Colors.secondary,
  },
});

export default kshirsaStepIndicatorStyles;