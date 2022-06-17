import axios, {AxiosInstance} from "axios";
/*
const isDev = true;
const isLocalHost = true;
*/

export const API: AxiosInstance = axios.create({
    baseURL: `http://localhost:8080/api/`,
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: true,
});

export const AuthAPI: AxiosInstance = axios.create({ // only used for login and logout
    baseURL: `http://localhost:8080/`,
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: true,
});

export default API;