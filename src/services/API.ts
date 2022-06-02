import axios, {AxiosInstance} from "axios";

const isDev = true; // TODO: change to false when in prod

const API: AxiosInstance = axios.create({
    baseURL: `http://brueckenkurs-programmieren.thm.de/api${isDev ? '-dev' : ''}/`,
    headers: {
        "Content-type": "application/json",
    },
});
export default API;