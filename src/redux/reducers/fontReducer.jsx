import { createSlice } from "@reduxjs/toolkit";
import { GET_FONTS } from "../actions/types";


const fontsSlice = createSlice({
    name: GET_FONTS,
    initialState: { loaded: false },
    reducers: {
      setFontsLoaded: (state) => {
        state.loaded = true;
      },
    },
  });
  
  export const { setFontsLoaded } = fontsSlice.actions;
  export default fontsSlice;