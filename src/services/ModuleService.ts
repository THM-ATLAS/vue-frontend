import API from "@/services/API";
import {User, Module} from "@/helpers/types";

class ModuleService {
    //TODO: Return / check response codes

    loadModules(user: User): Promise<any> {
        return API.get(`modules/${user.user_id}`);
    }

    getModule(id: number): Promise<any> {
        return API.get(`modules/${id}`);
    }

    delModule(module: Module): Promise<any> {
        return API.delete(`modules/${module.id}`);
    }


    editModule(module: Module): Promise<any> {
        return API.put(`modules/`, {
                module: {
                    id: module.id,
                    name: module.name
                }
            }
        );
    }

    addModule(module: Module): Promise<any> {
        return API.post(`modules/`, {
                module: {
                    id: module.id,
                    name: module.name
                }
            }
        );
    }
}

export default new ModuleService();