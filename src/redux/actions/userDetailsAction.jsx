import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_USER_DETAILS, UPDATE_USER_DETAILS } from "./types";
import { fetchData } from "../../api/apiUtils";
import urls from "../../api/url";

const getUserDetailsAction = createAsyncThunk(
    GET_USER_DETAILS,
    async (_, { rejectWithValue }) => {
        try {
          const response = await fetchData(urls.getUserDetails); 
          return response;
        } catch (error) {
          return rejectWithValue(error?.response?.data); 
        }
      }
)

export const updateUserDetailsAction = createAsyncThunk(
    UPDATE_USER_DETAILS,
    async (_, { rejectWithValue }) => {
        try {
          const response = await unAuthfetchData(urls.generateOtp); 
          return response;
        } catch (error) {
          return rejectWithValue(error.response?.data || error.message); 
        }
      }
)

export default getUserDetailsAction;
