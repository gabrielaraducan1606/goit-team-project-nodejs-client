import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../services/reduxServices";

const initialState = {
  userData: {
    id: null,
    name: null,
    email: null,
    token: null,
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
      });
  },
});

const userReducer = userSlice.reducer;
export default userReducer;
