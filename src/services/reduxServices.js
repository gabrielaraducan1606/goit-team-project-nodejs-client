import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { cookies } from "../utils/cookies";
import apiClient from "../utils/apiClient";
import fileClient from "../utils/fileClient";

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
      cookies.set("refreshToken", response.data.data.refreshToken);
      console.log(response.data);

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

// Updating user profile
// This function should be called when the user clicks the save button in the edit profile modal
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (updates, thunkAPI) => {
    try {
      const res = await apiClient.patch("/auth/profile", updates);
      const { name, email } = res.data.data.user;
      return { name, email };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Uploading user avatar
// This function should be called when the user clicks the save button in the edit profile modal
export const uploadUserAvatar = createAsyncThunk(
  "user/uploadUserAvatar",
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await fileClient.post("/auth/avatar", formData);
      return res.data.data.user.avatarURL;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);
