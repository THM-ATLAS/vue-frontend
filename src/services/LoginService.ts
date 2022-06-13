import API from "@/services/API";

class LoginService {
    //TODO: Return / check response codes

    login(username: string, password: string): any {
        return API.post(`login`, {
            username,
            password
        })
    }

    logout(): any {
        return API.post(`logout`, {})
    }
}

export default new LoginService();