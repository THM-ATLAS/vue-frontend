// @ts-ignore
import axios, { AxiosInstance } from "axios";
const API: AxiosInstance = axios.create({
    baseURL: "https://brueckenkurs-programmieren.thm.de/api",
    headers: {
        "Content-type": "application/json",
    },
});
export default API;