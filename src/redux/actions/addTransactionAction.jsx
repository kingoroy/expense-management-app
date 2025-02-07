import { createAsyncThunk } from "@reduxjs/toolkit";
import { GENERATE_OTP } from "./types";
import { sendData, unAuthfetchData } from "../../api/apiUtils";
import urls from "../../api/url";

const addTransactionAction = createAsyncThunk(
    GENERATE_OTP,
    async (body, { rejectWithValue }) => {
        try {
            const response = await sendData({
              endpoint: urls.addTransaction,
              body,
              method: 'post',
  
            }); 
            return response;
          } catch (error) {
            return rejectWithValue(error.response?.data || error.message); 
          }
        }
)

export default addTransactionAction;