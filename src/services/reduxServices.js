import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, userData);
      const { _id, name, email, token } = response.data.data;
      return response.status === 200 ? { id: _id, name, email, token } : null;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.response.data);
    }
  }
);
