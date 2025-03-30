/* eslint-disable */

// This file contains functions that are not used in the current codebase but may be useful in the future or are left for reference.

// Creates a new board
// This function should be called when the user clicks the create button in the create board modal
const createBoard = createAsyncThunk(
  "user/createBoard",
  async (boardData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/boards", boardData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



