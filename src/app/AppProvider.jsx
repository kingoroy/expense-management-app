import store from "../redux/store";
import { Provider } from "react-redux";
import FontLoader from "../constants/fonts";
import Colors from "../styles/Colors";
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform } from "react-native";


const AppProvider = ({ children }) => (
    <Provider store={store} style={{ flex: 1, backgroundColor: Colors.moodyBlack }}>
      <StatusBar backgroundColor={Colors.secondary}  />
      <AlertNotificationRoot>
      <FontLoader>{children}</FontLoader>
      </AlertNotificationRoot>
   </Provider>
  );

  export default AppProvider;

  