/*
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
                    user_id : user.id,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    email : user.email,
                    password : user.password,
                    roles : user.roles
                }
            }
        )
    },

    addUser(user:User) : number{
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
        )
    }
}*/
