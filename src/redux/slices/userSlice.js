import { createSlice } from "@reduxjs/toolkit";

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
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: () => {},
});

const userReducer = userSlice.reducer;
export default userReducer;
