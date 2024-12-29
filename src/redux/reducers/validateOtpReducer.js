import { createSlice } from "@reduxjs/toolkit";
import { RESET_VALIDATE_OTP, VALIDATE_OTP } from "../actions/types";
import validateOtpAction from "../actions/validateOtpAction";
import  getStorage  from "../../utils/storage";
import { ACCESS_TOKEN, IS_SIGNUPFLOW_COMPLETE, REFRESH_TOKEN, REFRESH_TOKEN_EXPIRY_TIME } from "../../utils/storageKeys";

const storage = getStorage()
const initialState = {
    data: null,
    loading: false,
    error: null,
    message: null,
  };
  
  const validateOtpReducer = createSlice({
    name: VALIDATE_OTP,
    initialState,
    reducers: {
     [RESET_VALIDATE_OTP]: (state) => {
        state.data = null;
        state.loading = false;
        state.error = null;
     }
    },
    extraReducers: (builder) => {
      builder
        .addCase(validateOtpAction.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(validateOtpAction.fulfilled, (state, action) => {
            const { data, success, message } = action.payload;
            state.loading = false;
            state.data = data;
            state.success = success;
            state.message = message;
            storage.setItem(ACCESS_TOKEN, data?.accessToken);
            storage.setItem(REFRESH_TOKEN, data?.refreshToken);
            storage.setItem(IS_SIGNUPFLOW_COMPLETE, data?.isSignupFlowCompleted);
            storage.setItem(REFRESH_TOKEN_EXPIRY_TIME, data?.refreshTokenExpirationTime);
        })
        .addCase(validateOtpAction.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
    },
  });
  export const {
    RESET_VALIDATE_OTP : resetValidateOtpAction,

  } = validateOtpReducer.actions;
  export default validateOtpReducer.reducer;