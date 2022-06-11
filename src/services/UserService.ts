import API from "@/services/API";
import {User, UserRole} from "@/helpers/types"

class UserService {

    //TODO: Return / check response codes
    getUser(id: string): Promise<any> {
        return API.get(`users/${id}`);
    }

    getMe(): Promise<any> {
        return API.get(`users/me`);
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

    getRoles(): Promise<UserRole[]> {
        return API.get(`roles/`);
    }

}

export default new UserService();