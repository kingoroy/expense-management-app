import { createSlice } from "@reduxjs/toolkit";
import generateOtpAction from "../actions/generateOtpAction";
import { GENERATE_OTP, RESET_GENERATE_OTP } from "../actions/types";

const initialState = {
  data: null,
  loading: false,
  error: null,
  success: null,
  message: null,
};

const generateOtpReducer = createSlice({
  name: GENERATE_OTP,
  initialState,
  reducers: {
    [RESET_GENERATE_OTP]: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.success = null;
      state.message = null;
  }
},
  extraReducers: (builder) => {
    builder
      .addCase(generateOtpAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
        state.message = null;
      })
      .addCase(generateOtpAction.fulfilled, (state, action) => {
        const { data, success, message } = action.payload;
        state.loading = false;
        state.data = data;
        state.success = success;
        state.message = message;
      })
      .addCase(generateOtpAction.rejected, (state, action) => {
        const { errorDetails, success, message } = action.payload
        state.loading = false;
        state.error = errorDetails;
        state.success = success || false;
        state.message = message;
      });
  },
});

export const { 
  RESET_GENERATE_OTP: resetGenerateOtpAction
 } = generateOtpReducer.actions;
export default generateOtpReducer.reducer;
