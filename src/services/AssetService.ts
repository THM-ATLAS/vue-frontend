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

    /*
    downloading a BLOB with the created URL will give it a random filename and no file extension,
    this is a workaround to give it a filename (with file extension if provided in the name)
     */
    downloadAssetPrompt(assetId: number, fileName: string){
        this.downloadAsset(assetId).then((response: AxiosResponse) => {
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style.display = "none";
            const blob = new Blob([response.data], { type: 'application/octet-stream' }); //Backend doesn't provide MIME type
            const url = window.URL.createObjectURL(blob)
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        })
    }
}

export default new AssetService();