import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${apiUrl}/api/auth`;

async function registerUser(username, email, password) {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      username,
      email,
      password,
    });
    return response.data; // Ожидаемый ответ: { message, user, token }
  } catch (error) {
    console.error(
      "Ошибка при регистрации:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function loginUser(email, password) {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    return response.data; // Ожидаемый ответ: { message, user, token }
  } catch (error) {
    console.error(
      "Ошибка при входе:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}
