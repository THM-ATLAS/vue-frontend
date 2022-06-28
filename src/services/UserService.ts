import API from "@/services/API";
import {User} from "@/helpers/types"

class UserService {

    //TODO: Return / check response codes
    getUser(id: number): Promise<any> {
        return API.get(`users/${id}`);
    }

    getUsers(): Promise<any> {
        return API.get(`users/`);
    }

    delUser(user: User): Promise<any> {
        return API.delete(`users/${user.user_id}`);
    }

    editUser(user: User): Promise<any> {
        return API.put(`users/`, user);
    }

    addUser(user: User): Promise<any> {
        return API.post(`users/`, user);
    }

    getRoles(): Promise<any> {
        return API.get(`roles/`);
    }

    getMe(): Promise<any> {
        return API.get(`users/me`)
    }

}

export default new UserService();