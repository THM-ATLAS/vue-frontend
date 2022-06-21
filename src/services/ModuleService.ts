import API from "@/services/API";
import {Module, ModuleUser} from "@/helpers/types";

class ModuleService {
    //TODO: Return / check response codes

    /*loadModules(user: User): Promise<any> {
        return API.get(`modules/${user.id}`);
    }*/

    getModules(): Promise<any> {
        return API.get(`modules`);
    }

    getModule(id: string): Promise<any> {
        return API.get(`modules/${id}`);
    }

    delModule(module: Module): Promise<any> {
        return API.delete(`modules/${module.module_id}`);
    }


    editModule(module: Module): Promise<any> {
        return API.put(`modules`, module);
    }

    addModule(module: Module): Promise<any> {
        return API.post(`modules`, module);
    }

    getModuleUsers(module: Module): Promise<any> {
        return API.get(`modules/users/${module.module_id}`);
    }

    addModuleUser(module: Module, user: ModuleUser): Promise<any> {
        return API.post(`modules/users/${module.module_id}`, user);
    }

    editModuleUser(module: Module, user: ModuleUser): Promise<any> {
        return API.put(`modules/users/${module.module_id}`, user)
    }

    delModuleUser(module: Module, user: ModuleUser): Promise<any> {
        return API.delete(`modules/users/${module.module_id}/${user.user_id}`);
    }

    addMultipleModuleUsers(module: Module, users: ModuleUser[]) {
        return API.post(`modules/users/multiple/${module.module_id}`, users);
    }

    delMultipleModuleUsers(module: Module, users: ModuleUser[]) {
        return API.post(`modules/users/${module.module_id}`, users);
    }
}

export default new ModuleService();