// utility/axios.js
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // Replace with your backend URL
  timeout: 5000,
});

const API_URL = "http://localhost:3000/api";

export const fetchQuestions = async () => {
  const res = await fetch(`${API_URL}/question`);
  return res.json();
};

export const fetchQuestionDetails = async (id) => {
  const res = await fetch(`${API_URL}/question/${id}`);
  return res.json();
};

export const fetchAnswers = async (id) => {
  const res = await fetch(`${API_URL}/answer/${id}`);
  return res.json();
};

// import axios from "axios";

// // const serverPort = import.meta.env.PORT || 3000;

// export const axiosInstance = axios.create({
//   //local endpoint reference
//   // baseURL: `http://localhost:${serverPort}/api/v1`,
//   // deployed endpoint reference
//   //   baseURL: "https://evangadiforumproject-vpsk.onrender.com/api/v1",
// });
