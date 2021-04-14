import userModel from '../models/UserModel';
import img from '@img/img.png';

export function updateAvatar(): void {
    const data = userModel.getData();
    console.log('updating avatar, data is: ', data);
    if (data.photos !== undefined && data.photos.length > 0) {
        (<HTMLImageElement>document.querySelector('.u-avatar-header')).src = data.photos[0];
        return;
    }
    if (data.photos === undefined) {
        (<HTMLImageElement>document.querySelector('.u-avatar-header')).src = img;
    }
}
