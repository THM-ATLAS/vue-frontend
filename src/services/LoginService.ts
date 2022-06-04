import API from "@/services/API";
import {AxiosResponse} from "axios";
import {TokenRet, User} from "@/helpers/types";
import UserService from "@/services/UserService";

class LoginService {
    //TODO: Return / check response codes

    login(username: string, password: string): Promise<User> | void {
        API.post(`authenticate`, {
            username,
            password
        }).then((response: AxiosResponse) => {
            localStorage.setItem("token", response.data.token);
            // get and return user here
            UserService.getUsers().then((users: User[]) => {
                return users[0];
            });
        }).catch((error) => {
            console.log(error);
            return Promise.reject(error);
        });
        return;
    }
}

export default new LoginService();