import axios from "axios";
import { backend } from "../constants/consts";

export const axiosInstance = axios.create({
    baseURL: backend.baseUrl,
    timeout: 3000
})