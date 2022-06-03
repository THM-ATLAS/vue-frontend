import API from "@/services/API";
import {AxiosResponse} from "axios";

class LoginService {
    //TODO: Return / check response codes

    login(username: string, password: string): Promise<AxiosResponse<any, any>> {
        return API.post(`authenticate`, {
            username,
            password
        })
    }
}

export default new LoginService();