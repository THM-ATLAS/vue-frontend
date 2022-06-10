import API from "@/services/API";
import {User, UserRole, Settings} from "@/helpers/types"

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

    getRoles(): Promise<UserRole[]> {
        return API.get(`roles/`);
    }
    getSettings(id: number): Promise<Settings> {
        return API.get(`settings/$id`)
    }
    setSettings(settings : Settings): Promise<any> {
        return API.put(`settings/`, settings)
    }
}

export default new UserService();