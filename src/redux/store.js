import { configureStore } from "@reduxjs/toolkit";
import fontsSlice from "./reducers/fontReducer";

const store = configureStore({
    reducer: {
      fonts: fontsSlice.reducer,
    },
  });

  export default store;