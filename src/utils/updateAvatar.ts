import userModel from '../models/UserModel';
import img from '@img/img.jpg';
import Spinner from '../components/Spinner/Spinner';
import IconClass from '../components/Icon/Icon';

export function updateAvatar(): void {
    const currentElement = document.querySelector('.u-avatar-header') as HTMLImageElement;
    if (!currentElement) {
        return;
    }

    const spinner = new Spinner({ size: 'small', classes: 'u-avatar-header' }).render();
    const parentNode = currentElement.parentElement;
    parentNode.innerHTML = spinner;

    if (userModel.getData()?.photos?.length > 0) {
        const newAvatar = new IconClass({
            iconClasses: 'avatar u-avatar-header',
            size: 28,
            src: userModel.getData().photos[0] ?? img
        }).render();

        let newElem = document.createElement('div');
        newElem.innerHTML = newAvatar;
        newElem = newElem.firstElementChild as HTMLImageElement;
        newElem.onload = () => {
            parentNode.innerHTML = newAvatar;
        };
    }
}
