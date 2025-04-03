import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBoards,
  fetchColumns,
  loginUser,
} from "../../services/reduxServices";
import { cookies } from "../../utils/cookies";

const initialState = {
  userData: {
    id: null,
    name: null,
    email: null,
    avatarURL: null,
  },
  boards: [],
  columns: [],
  isLoggedIn: false,
  isFetching: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.userData.avatarURL = null;
      state.userData.email = null;
      state.userData.id = null;
      state.userData.name = null;
      state.boards = [];
      state.columns = [];
      state.isFetching = false;
      state.isLoggedIn = false;
      localStorage.removeItem("persist:root");
      cookies.remove("token");
      cookies.remove("refreshToken");
      window.location.href = "/auth";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isFetching = false;
        state.userData = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      })
      .addCase(fetchBoards.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.isFetching = false;
        state.boards = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      })
      .addCase(fetchColumns.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(fetchColumns.fulfilled, (state, action) => {
        state.isFetching = false;
        state.columns = action.payload;
      })
      .addCase(fetchColumns.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      });
  },
});

export const { logOut } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
