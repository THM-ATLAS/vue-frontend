import {AuthAPI} from "@/services/API";
import {AxiosResponse} from "axios";

class LoginService {
    //TODO: Return / check response codes

    login(username: string, password: string): any {
        return AuthAPI.post(`login`, {
            username,
            password
        })
    }

    logout(): any {
        return AuthAPI.post(`logout`, {})
    }
}

export default new LoginService();

export function isLoggedIn(response: AxiosResponse) {
    return response.status === 200 && (response.data?.user_id ?? -1 > -1);
}