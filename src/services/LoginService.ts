import API from "@/services/API";

class LoginService {
    //TODO: Return / check response codes

    login(username: string, password: string)  {
        return API.post(`authenticate`, {
            username: `${username}`,
            password: `${password}`
        });
    }
}

export default new LoginService();