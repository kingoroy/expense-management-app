import { createAsyncThunk } from "@reduxjs/toolkit";
import { VALIDATE_OTP } from "./types";
import { unAuthsendData } from "../../api/apiUtils";
import urls from "../../api/url";

const validateOtpAction = createAsyncThunk(
    VALIDATE_OTP,
    async ({headers, body}, { rejectWithValue }) => {
        try {
          const response = await unAuthsendData({
           endpoint: urls.validateOtp,
           body: body,
           headers: headers,
          }); 
          return response;
        } catch (error) {
          console.error('Error fetching example data:', error?.response?.data);
          return rejectWithValue(error?.response?.data || error?.message); 
        }
      }
)

export default validateOtpAction;