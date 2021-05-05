import HttpRequests from '../utils/requests';
import { IResponseData, parseJson } from '../utils/helpers';
import { imageStorageLocation } from '../consts/config';

class AlbumModel {
    static instance: AlbumModel = null;

    static getInstance() {
        if (!AlbumModel.instance) {
            AlbumModel.instance = new AlbumModel();
        }

        return AlbumModel.instance;
    }

    updatePhotos(photos: string[]): Promise<IResponseData> {
        return HttpRequests.post('/secretAlbum', { photos })
            .then(parseJson)
            .then((response) => {
                response.json = {
                    photos: response.json.photos.map((uuid: string) => imageStorageLocation + '/' + uuid)
                };
                return response;
            });
    }

    getPhotos(userId: number): Promise<IResponseData> {
        return HttpRequests.get(`/secretAlbum/${userId}`)
            .then(parseJson)
            .then((response) => {
                response.json = {
                    photos: response.json.photos.map((uuid: string) => imageStorageLocation + '/' + uuid)
                };
                return response;
            });
    }

    unlockForUser(userId: number): Promise<IResponseData> {
        return HttpRequests.post(`/unlockSecretAlbum/${userId}`, {}).then(parseJson);
    }
}

export default AlbumModel.getInstance();
