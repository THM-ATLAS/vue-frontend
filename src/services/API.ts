import axios, {AxiosInstance} from "axios";

const isDev = true; // TODO: change to false when in prod
const isLocalHost = true;

const API: AxiosInstance = axios.create({
    baseURL: isLocalHost ? `http://localhost:8080/api/` : `http://brueckenkurs-programmieren.thm.de/api${isDev ? '-dev' : ''}/`,
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: true,
});
export default API;