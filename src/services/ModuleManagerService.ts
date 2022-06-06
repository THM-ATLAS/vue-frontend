import API from "@/services/API";
import {Module, ModuleUser} from "@/helpers/types";

class ModuleManagerService {
    
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

export default new ModuleManagerService();