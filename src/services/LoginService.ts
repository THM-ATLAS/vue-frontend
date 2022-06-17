import {AuthAPI} from "@/services/API";

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