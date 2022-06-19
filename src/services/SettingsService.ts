import API from "@/services/API";
import {UserSettings} from "@/helpers/types"

class SettingsService {

    getUserSettings(id: number): Promise<any> {
        return API.get(`settings/${id}`);
    }
    editUserSettings(settings: UserSettings): Promise<any> {
        return API.put(`settings/`, settings);
    }
}

export default new SettingsService();