import userModel from '../models/UserModel.js';
import img from '../../public/img/img.png';

export function updateAvatar() {
    const data = userModel.getData();
    console.log('updating avatar, data is: ', data);
    if (data.photos !== undefined && data.photos.length > 0) {
        document.querySelector('.u-avatar-header').src = data.photos[0];
        return;
    }
    if (data.photos === undefined) {
        document.querySelector('.u-avatar-header').src = img;
    }
}
