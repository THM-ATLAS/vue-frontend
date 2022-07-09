import API from "@/services/API";
import {Icon} from "@/helpers/types";

class IconService {
    //TODO: Return / check response codes
    getIcons(): Promise<any> {
        return API.get(`icons`);
    }

    addIcon(icon: Icon): Promise<any> {
        return API.post(`icons`, icon);
    }

    delIcon(icon: Icon): Promise<any> {
        return API.delete(`icons/${icon.icon_id}`);
    }
    
}

export default new IconService();