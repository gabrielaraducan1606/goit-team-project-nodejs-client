import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { cookies } from "../utils/cookies";
import apiClient from "../utils/apiClient";

const BASE_URL = import.meta.env.VITE_API_URL;

// Fetching and populating the userData object in the state of the userSlice
// This function should be called when the user clicks the login button on the login page
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, userData);
      const { _id, name, email, avatarURL } = response.data.data.user;
      cookies.set("token", response.data.data.accessToken);
      return response.status === 200
        ? { id: _id, avatarURL, name, email }
        : null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetching and populating the boards array in the state of the userSlice
// This function should be called when the user reaches the dashboard page or after the user creates a board updates a board or deletes a board
export const fetchBoards = createAsyncThunk(
  "user/fetchBoards",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/boards`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Fetching and populating the columns array in the state of the userSlice
// This function should be called when the user clicks on a board in the sidebar or when the user creates a new column,edits a column or deletes a column
export const fetchColumns = createAsyncThunk(
  "user/fetchColumns",
  async (boardId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/columns/${boardId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

