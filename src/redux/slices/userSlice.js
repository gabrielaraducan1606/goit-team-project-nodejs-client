import { createSlice } from "@reduxjs/toolkit";
import { fetchBoards, loginUser } from "../../services/reduxServices";

const initialState = {
  userData: {
    id: null,
    name: null,
    email: null,
    token: null,
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
  reducers: {},
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
  },
});

const userReducer = userSlice.reducer;
export default userReducer;
