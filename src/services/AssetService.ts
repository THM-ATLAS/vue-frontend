import API from "@/services/API";

import {Asset} from "@/helpers/types";

// @ts-ignore

class AssetService {
    editAsset(asset: Asset): Promise<any> {
        return API.put(`assets/`, asset);
    }

    addAsset(asset: Asset): Promise<any> {
        return API.post(`assets/`, asset);
    }

    getAsset(assetId: number): Promise<any> {
        return API.get(`assets/${assetId}`);
    }

    delAsset(assetId: number): Promise<any> {
        return API.delete(`assets/${assetId}`);
    }

    getAssetAsPng(assetId: number): Promise<any> {
        return API.get(`assets/${assetId}/view`);
    }

    downloadAsset(assetId: number): Promise<any> {
        return API.get(`assets/${assetId}/download`);
    }
}

export default new AssetService();