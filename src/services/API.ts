import axios, {AxiosInstance} from "axios";

const isDev = false; // TODO: change to false when in prod
const isLocalHost = false;

const API: AxiosInstance = axios.create({
    baseURL: isLocalHost ? `http://localhost:8080/` : `http://brueckenkurs-programmieren.thm.de/api${isDev ? '-dev' : ''}/`,
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: true,
});
export default API;