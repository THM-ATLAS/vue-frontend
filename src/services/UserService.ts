
import API from "@/services/API";
import {User} from "@/helpers/types"

class UserService {

    //TODO: Return / check response codes
    getUser(id : number) : Promise<any>{
        return API.get(`users/${id}`);
    }

    delUser(user:User) : Promise<any>{
        return API.delete(`users/${user.id}`);
    }

    editUser(user:User) : Promise<any>{
        return API.put(`users/`,{
                user : {
                    user_id : user.id,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    email : user.email,
                    password : user.password,
                    roles : user.roles
                }
            }
        );
    }

    addUser(user:User) : Promise<any>{
        return API.post(`users/`,{
                user : {
                    user_id : user.id,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    email : user.email,
                    password : user.password,
                    roles : user.roles,
                    settings : user.settings
                }
            }
        );
    }
}
 export default new UserService();