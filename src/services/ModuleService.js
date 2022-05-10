import API from "@/services/API";
import {User, Module} from "@/helpers/types"

export default {
    //TODO: Return / check response codes

    loadModules(user:User) : Module[]{
        return API.get(`modules/${user.id}`)
    },

    getModule(id:number) : Module{
        return API.get(`modules/${id}`)
    },

    delModule(module:Module) : number{
        return API.delete(`modules/${module.id}`)
    },

    editModule(module:Module) : number{
        return API.put(`modules/`,{
                module : {
                    id : module.id,
                    name : module.name
                }
            }
        )
    },

    addModule(module:Module) : number{
        return API.post(`modules/`,{
            module : {
                id : module.id,
                name : module.name
            }
            }
        )
    }
}