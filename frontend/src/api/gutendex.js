import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

export const fetchBooks = async (page = 1) => {
  const response = await axios.get(`${API_BASE}/books?page=${page}`);
  return response.data;
};

export const fetchBookById = async (id) => {
  const response = await axios.get(`${API_BASE}/books/${id}`);
  return response.data;
};
