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
    downloading a BLOB with the created URL will give it a random filename and no file extension as no MIME type
    is provided by the backend response,
    this is a workaround to give it a filename (with file extension if provided in the name)
     */
    downloadAssetPrompt(assetId: number, fileName: string){
        this.downloadAsset(assetId).then((response: AxiosResponse) => {
            //Backend doesn't provide MIME type, so type is set to a .bin file
            const blob = new Blob([response.data], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement("a");
            a.style.display = "none";
            document.body.appendChild(a);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        })
    }
}

export default new AssetService();