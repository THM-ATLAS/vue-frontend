import axios, {AxiosInstance} from "axios";
/*
const isDev = true;
const isLocalHost = true;
*/

export const API: AxiosInstance = axios.create({
    baseURL: `http://brueckenkurs-programmieren.thm.de/api/`, // PROD!
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: true,
});

export const AuthAPI: AxiosInstance = axios.create({ // only used for login and logout
    baseURL:  ,
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: true,
});

export default API;
