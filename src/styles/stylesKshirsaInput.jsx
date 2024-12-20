import { StyleSheet } from "react-native";
import Colors from "./Colors";
import cssUtils from "../constants/cssUtils";

export default kshirsaInputStyles = StyleSheet.create({
    container: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 10,
        width: '100%',
        minHeight: 20,
        position: 'relative',
        height:50, 
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        // flex: 1,
    },
    normalInputWrapper: {
        backgroundColor: Colors.normalInputBg
    },
    errorInputWrapper: {
        backgroundColor: Colors.errorInputBg
    },
    normalInput: {
        color: Colors.white,
    },
    successInput: {
        color: Colors.secondary,
    },
    LablelWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center', 
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    input: {
        color: 'white',
        fontSize: cssUtils.smallTextSize,
        width: '80%',
        alignItems: 'center',
        borderColor: Colors.white,
        justifyContent: 'center',
    },
    checkWrapper: {
     width: '10%',
    },
    errorText: {
        color: Colors.red,
        fontSize: cssUtils.smallTextSize,
    },
})