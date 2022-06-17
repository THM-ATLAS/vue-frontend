import axios, {AxiosInstance} from "axios";
/*
const isDev = true;
const isLocalHost = true;
*/

const API: AxiosInstance = axios.create({
    baseURL: `http://localhost:8080/api/`,
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: true,
});
export default API;