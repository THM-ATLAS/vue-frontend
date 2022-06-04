import API from "@/services/API";
import {AxiosResponse} from "axios";
import {TokenRet, User} from "@/helpers/types";
import UserService from "@/services/UserService";

class LoginService {
    //TODO: Return / check response codes

    login(username: string, password: string): Promise<User> {
        return API.post(`authenticate`, {
                username,
                password
            }, {withCredentials: true} // this *would* work if we got a token from the server
        ).then((response: AxiosResponse) => {
            console.log(response.headers) // there should be a Set-Cookie header with a token
            const token = response.headers["set-cookie"]?.pop() || "";
            localStorage.setItem("token", token);
            return response.data;
        }).catch((error) => {
            console.log(error);
            return Promise.reject(error);
        });
    }
}

export default new LoginService();