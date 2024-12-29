import { KeyboardAvoidingView, Platform, View } from "react-native";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { Provider } from "react-redux";
import Colors from "../styles/Colors";
import { StatusBar } from "expo-status-bar";
import KshirsaStore from "../redux/store";


const AppProvider = ({ children }) => {
  return (
  <Provider store={KshirsaStore}>
    <AlertNotificationRoot>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: Colors.moodyBlack }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StatusBar backgroundColor={Colors.secondary} />
        {/* <FontLoader> */}
          {children}
          {/* </FontLoader> */}
      </KeyboardAvoidingView>
    </AlertNotificationRoot>
  </Provider>
  )
};

export default AppProvider;
