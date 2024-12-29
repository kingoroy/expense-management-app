import { configureStore } from "@reduxjs/toolkit";
import fontsSlice from "./reducers/fontReducer";
import validateOtpReducer from "./reducers/validateOtpReducer";
import generateOtpReducer from "./reducers/generateOtpReducer";
import userDetailsReducer from "./reducers/userDetailsReducer";

const KshirsaStore = configureStore({
    reducer: {
      fonts: fontsSlice.reducer,
      generateOtpReducer: generateOtpReducer,
      validateOtpReducer: validateOtpReducer,
      userDetailsReducer: userDetailsReducer,
    },
  });

  export default KshirsaStore;