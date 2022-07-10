import {Module} from "@/helpers/types";
import API from "@/services/API";

class ReferralService {

    getModuleReferralAssets(module: Module) {
        return API.get(`modules/referrals/assets/${module.module_id}`);
    }

    addModuleReferralAsset(module: Module, assetID: number) {
        return API.post(`modules/referrals/assets/${module.module_id}`, {
            "module_asset_id": 0,
            "module_id": module.module_id,
            "asset_id": assetID
        });
    }

    delModuleReferralAsset(module: Module, referralID: number) {
        return API.delete(`modules/referrals/assets/${module.module_id}/${referralID}`);
    }


    //Links tested, works.
    getModuleReferralLinks(module: Module) {
        return API.get(`modules/referrals/links/${module.module_id}`);
    }

    addModuleReferralLink(module: Module, link: string) {
        return API.post(`modules/referrals/links/${module.module_id}`, {
            "module_link_id": 0, //needs to be 0 for some reason
            "module_id": module.module_id,
            "link": link
        });
    }

    delModuleReferralLink(module: Module, referralID: number) {
        return API.delete(`modules/referrals/links/${module.module_id}/${referralID}`);
    }
}

export default new ReferralService();