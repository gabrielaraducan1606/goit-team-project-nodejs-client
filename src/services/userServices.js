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
    return response;
  } catch (error) {
    return error.response.message;
  }
};

// Updates a board
// This function should be called when the user clicks the update button in the edit board modal
export const updateBoard = async (boardId, boardData) => {
  try {
    const response = await apiClient.patch(`/boards/${boardId}`, boardData);
    return response;
  } catch (error) {
    return error.response.message;
  }
};

// Deletes a board
// This function should be called when the user clicks the confirm delete button
export const deleteBoard = async (boardId) => {
  try {
    const response = await apiClient.delete(`/boards/${boardId}`);
    return response;
  } catch (error) {
    return error.response.message;
  }
};

// Creates a new column
// This function should be called when the user clicks the create button in the create column modal
// columnData should contain the boardId and the title of the column
export const createColumn = async (columnData) => {
  try {
    const response = await apiClient.post("/columns", columnData);
    return response;
  } catch (error) {
    return error.response.message;
  }
};

// Updates a column
// This function should be called when the user submits the edit column modal
export const updateColumn = async (columnId, data) => {
  try {
    const response = await apiClient.patch(`/columns/${columnId}`, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

// Deletes a column
// This function should be called when the user clicks the confirm delete button in the delete column modal
export const deleteColumn = async (columnId) => {
  try {
    const response = await apiClient.delete(`/columns/${columnId}`);
    return response;
  } catch (error) {
    return error.response.message;
  }
};

// Fetches all cards for a specific column
// This function should be called when the user clicks on a board and the columns are fetched
export const fetchCards = async (columnId) => {
  try {
    const response = await apiClient.get(`/cards/${columnId}`);
    return response.data;
  } catch (error) {
    return error.response.message;
  }
};

// Creates a new card
// This function should be called when the user clicks the add button in the add card modal
// cardData should contain the columnId, title, description, label, and deadline of the card
export const createCard = async (cardData) => {
  try {
    const response = await apiClient.post("/cards", cardData);
    return response.status;
  } catch (error) {
    return error.response.message;
  }
};

// Updates a card
// This function should be called when the user clicks the update button in the edit card modal
// cardData may contain the columnId, title, description, label, and deadline of the card
export const updateCard = async (cardId, cardData) => {
  try {
    const response = await apiClient.patch(`/cards/${cardId}`, cardData);
    return response.status;
  } catch (error) {
    return error.response.message;
  }
};

// Deletes a card
// This function should be called when the user clicks the confirm delete button in the delete card modal
export const deleteCard = async (cardId) => {
  try {
    const response = await apiClient.delete(`/cards/${cardId}`);
    return response.status;
  } catch (error) {
    return error.response.message;
  }
};

// Filters the cards based on the search query
// This function should be called always before diplayng the cards
export const filtereCards = (query, cards) => {
  if (query) {
    return cards.filter((card) =>
      card.priority.toLowerCase().includes(query.toLowerCase())
    );
  }
  return cards;
};

// Used to get the src for the board background
// this function should be called every thime the board is changed and it has background
export const selectBG = (boardId, boardArr) => {
  const bg = boardArr.find((board) => board._id === boardId);
  return bg.background;
};
