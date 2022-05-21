import API from "@/services/API";
import {User, Module} from "@/helpers/types";

class ModuleService {
    //TODO: Return / check response codes

    /*loadModules(user: User): Promise<any> {
        return API.get(`modules/${user.id}`);
    }*/

    loadModules(): Promise<any> {
        return API.get(`modules/`);
    }

    getModule(id: number): Promise<any> {
        return API.get(`modules/${id}`);
    }

    delModule(module: Module): Promise<any> {
        return API.delete(`modules/${module.module_id}`);
    }

    editModule(module: Module): Promise<any> {
        return API.put(`modules/`, module);
    }

    addModule(module: Module): Promise<any> {
        return API.post(`modules/`, module);
    }
}

export default new ModuleService();