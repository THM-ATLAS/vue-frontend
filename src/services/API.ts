import axios, {AxiosInstance} from "axios";

const API: AxiosInstance = axios.create({
    baseURL: `http://brueckenkurs-programmieren.thm.de/api/`,
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: true,
});
export default API;