import axios from "axios";

const token = localStorage.getItem("Evandadi-Forum-token-JUN2024");

const axiosInstance = axios.create({
  baseURL: "http://localhost:3003/api",
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export { axiosInstance };
