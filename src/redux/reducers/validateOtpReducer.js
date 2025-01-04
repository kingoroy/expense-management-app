import { createSlice } from "@reduxjs/toolkit";
import { RESET_VALIDATE_OTP, VALIDATE_OTP } from "../actions/types";
import validateOtpAction from "../actions/validateOtpAction";
import { saveAuthData } from "../../utils/database";
import { setAuthTokens } from "../../utils/storage";

const initialState = {
    data: null,
    loading: false,
    error: null,
    success: null,
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
        state.success = null;
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
            const saveStorage = {
                jwtToken: data?.accessToken,
                refreshToken: data?.refreshToken,
                isSignUpFlowCompleted: data?.isSignUpFlowCompleted,
                refreshTokenExpirationTime: data?.refreshTokenExpirationTime
            }
            state.loading = false;
            state.data = data;
            state.success = success;
            state.message = message;
           setAuthTokens(saveStorage);
        })
        .addCase(validateOtpAction.rejected, (state, action) => {
        const { errorDetails, success, message } = action.payload
          state.success = success || false;
          state.loading = false;
          state.error = errorDetails;
          state.message = message;
        })
    },
  });
  export const {
    RESET_VALIDATE_OTP : resetValidateOtpAction,

  } = validateOtpReducer.actions;
  export default validateOtpReducer.reducer;