import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.SPOTIFY_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export default axiosInstance;
