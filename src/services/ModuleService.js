import API from "@/services/API";
//import {User, Module} from "@/helpers/types"

export default {
    //TODO: Return / check response codes

    loadModules(/*user*/)  {
        return API.get(`modules/`)
        //return API.get(`modules/${user.id}`)
    },

    getModule(id) {
        return API.get(`modules/${id}`)
    },

    delModule(module){
        return API.delete(`modules/${module.id}`)
    },

    editModule(module) {
        return API.put(`modules/`,{
                module : {
                    id : module.id,
                    name : module.name
                }
            }
        )
    },

    addModule(module) {
        return API.post(`modules/`,{
            module : {
                id : module.id,
                name : module.name
            }
        })
    }
}