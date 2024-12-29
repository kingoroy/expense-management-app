import { createSlice } from "@reduxjs/toolkit";
import generateOtpAction from "../actions/generateOtpAction";
import { GENERATE_OTP } from "../actions/types";

const initialState = {
  data: null,
  loading: false,
  error: null,
  success: false,
  message: null,
};

const generateOtpReducer = createSlice({
  name: GENERATE_OTP,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateOtpAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
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

export default generateOtpReducer.reducer;
