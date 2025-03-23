import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, userData);
    return response.status;
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};
