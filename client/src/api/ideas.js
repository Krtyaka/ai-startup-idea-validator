import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createIdea = async (title, description) => {
  const response = await axios.post(`${API_BASE_URL}/ideas`, {
    title,
    description,
  });

  return response.data;
};

export const fetchIdeas = async () => {
  const response = await axios.get(`${API_BASE_URL}/ideas`);
  return response.data;
};

export const deleteIdea = async (id) => {
  await axios.delete(`${API_BASE_URL}/ideas/${id}`);
};

export const fetchIdeaById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/ideas/${id}`);
  return response.data;
};
