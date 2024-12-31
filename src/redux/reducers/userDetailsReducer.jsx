import { createSlice } from "@reduxjs/toolkit";
import { GET_USER_DETAILS } from "../actions/types";
import getUserDetailsAction, { updateUserDetailsAction } from "../actions/userDetailsAction";

const initialState = {
  data: null,
  loading: false,
  error: null,
  success: false,
  message: null,
  updateUserDetailsLoading: false,
};

const userDetailsReducer = createSlice({
  name: GET_USER_DETAILS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetailsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(getUserDetailsAction.fulfilled, (state, action) => {
        const { data, success, message } = action.payload;
        state.loading = false;
        state.data = data;
        state.success = success;
        state.message = message;
      })
      .addCase(getUserDetailsAction.rejected, (state, action) => {
        const { errorDetails, success, message } = action.payload
        state.loading = false;
        state.error = errorDetails;
        state.success = success || false;
        state.message = message;
      })
      .addCase(updateUserDetailsAction.pending, (state) => {
        state.updateUserDetailsLoading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(updateUserDetailsAction.fulfilled, (state, action) => {
        const { data, success, message } = action.payload;
        state.updateUserDetailsLoading = false;
        state.data = data;
        state.success = success;
        state.message = message;
      })
      .addCase(updateUserDetailsAction.rejected, (state, action) => {
        const { errorDetails, success, message } = action.payload
        state.updateUserDetailsLoading = false;
        state.error = errorDetails;
        state.success = success || false;
        state.message = message;
      });
  },
});

export default userDetailsReducer.reducer;
