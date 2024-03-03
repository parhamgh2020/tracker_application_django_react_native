import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

url = "https://0ac7-18-168-191-224.ngrok-free.app";

const trackerAPI = axios.create({
  baseURL: url,
  timeout: 5000, // Increased timeout value
});

trackerAPI.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default trackerAPI;
