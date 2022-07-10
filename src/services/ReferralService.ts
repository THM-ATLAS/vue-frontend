import {Module} from "@/helpers/types";
import API from "@/services/API";

class ReferralService {

    getModuleReferralAssets(module: Module) {
        return API.get(`modules/referrals/links/${module.module_id}`);
    }

    addModuleReferralAsset(module: Module, assetID: number) {
        return API.post(`modules/referrals/assets/${module.module_id}`, {
            "module_asset_id": 0, //not sure what this value needs to be as this method is adding an asset -> no available id
            "module_id": module.module_id,
            "asset_id": assetID
        });
    }

    delModuleReferralAsset(module: Module, referralID: number) {
        return API.delete(`modules/referrals/assets/${module.module_id}/${referralID}`);
    }

    getModuleReferralLinks(module: Module) {
        return API.get(`modules/referrals/links/${module.module_id}`);
    }

    addModuleReferralLink(module: Module, link: string) {
        return API.post(`modules/referrals/links${module.module_id}`, {
            "module_asset_id": 0, //not sure what this value needs to be as this method is adding an asset -> no available id
            "module_id": module.module_id,
            "asset_id": link
        });
    }

    delModuleReferralLink(module: Module, referralID: number) {
        return API.delete(`modules/referrals/links/${module.module_id}/${referralID}`);
    }
}

export default new ReferralService();