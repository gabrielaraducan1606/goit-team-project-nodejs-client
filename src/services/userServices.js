import axios from "axios";
import apiClient from "../utils/apiClient";

const BASE_URL = import.meta.env.VITE_API_URL;


// Registers a new user
// This function should be called when the user clicks the register button on the register page
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, userData);
    return response.status;
  } catch (error) {
    return error.response.data.message;
  }
};

// Creates a new board
// This function should be called when the user clicks the create button in the create board modal
export const createBoard = async (boardData) => {
  try {
    const response = await apiClient.post("/boards", boardData);
    return response.status;
  } catch (error) {
    return error.response.message;
  }
};

