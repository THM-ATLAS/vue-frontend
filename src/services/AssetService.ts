import API from "@/services/API";

import {Asset} from "@/helpers/types";
import {Axios, AxiosResponse} from "axios";

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

    downloadAssetPrompt(assetId: number, fileName: string){
        this.getAsset(assetId).then((response: AxiosResponse) => {
            /*
            Backend doesn't provide MIME type, so type is set to a .bin file
            this is a workaround to give the file a name (with file extension if provided in the name)
             */
            const a = document.createElement("a");
            a.style.display = "none";
            document.body.appendChild(a);
            a.href = "data:application/octet-stream;base64," + response.data.asset;
            a.download = fileName;
            a.click();
            a.remove();
        })
    }
}

export default new AssetService();