import axios, {AxiosInstance} from "axios";

const isDev = false;

export const API: AxiosInstance = axios.create({
    baseURL: isDev ? `http://localhost:8080/api/` : `/api/`,
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: true,
});

export const AuthAPI: AxiosInstance = axios.create({ // only used for login and logout
    baseURL: isDev ? `http://localhost:8080/` : `/`,
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: true,
});

export default API;
