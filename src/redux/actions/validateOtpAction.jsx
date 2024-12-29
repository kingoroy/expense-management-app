import { createAsyncThunk } from "@reduxjs/toolkit";
import { VALIDATE_OTP } from "./types";
import { unAuthPostData } from "../../api/apiUtils";
import urls from "../../api/url";

const validateOtpAction = createAsyncThunk(
    VALIDATE_OTP,
    async ({body}, { rejectWithValue }) => {
        try {
          const response = await unAuthPostData(urls.validateOtp, body); 
          return response;
        } catch (error) {
          console.error('Error fetching example data:', error.message);
          return rejectWithValue(error.response?.data || error.message); 
        }
      }
)

export default validateOtpAction;