import API from "@/services/API";
import {User} from "@/helpers/types"

export default {

    //TODO: Return / check response codes
    getUser(id : number) : User{
        return API.get(`users/${id}`)
    },

    delUser(user:User) : number{
        return API.delete(`users/${user.id}`)
    },

    editUser(user:User) : number{
        return API.put(`users/`,{
                user : {
                    id : user.id,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    email : user.email,
                    password : user.password,
                    role : user.role
                }
            }
        )
    },

    addUser(user:User) : number{
        return API.post(`users/`,{
                user : {
                    id : user.id,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    email : user.email,
                    password : user.password,
                    role : user.role
                }
            }
        )
    }
}