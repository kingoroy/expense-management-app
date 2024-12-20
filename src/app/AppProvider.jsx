import store from "../redux/store";
import { Provider } from "react-redux";
import FontLoader from "../constants/fonts";


const AppProvider = ({ children }) => (
    <Provider store={store}>
      <FontLoader>{children}</FontLoader>
   </Provider>
  );

  export default AppProvider;