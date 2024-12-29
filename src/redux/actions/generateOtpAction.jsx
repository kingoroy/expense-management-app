import { createAsyncThunk } from "@reduxjs/toolkit";
import { GENERATE_OTP } from "./types";
import { unAuthfetchData } from "../../api/apiUtils";
import urls from "../../api/url";

const generateOtpAction = createAsyncThunk(
    GENERATE_OTP,
    async ({queryParams}, { rejectWithValue }) => {
        try {
          const response = await unAuthfetchData(urls.generateOtp, queryParams); 
          return response;
        } catch (error) {
          return rejectWithValue(error.response?.data || error.message); 
        }
      }
)

export default generateOtpAction;