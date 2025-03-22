import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =''

// export const registerUser = createAsyncThunk(
//   "user/registerUser",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(