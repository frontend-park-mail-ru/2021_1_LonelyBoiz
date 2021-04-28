import userModel from '../models/UserModel';
import img from '@img/img.jpg';
import Spinner from '../components/Spinner/Spinner';
import IconClass from '../components/Icon/Icon';

export function updateAvatar(): void {
    const spinner = new Spinner({ size: 'small' }).render();
    const currentElement = <HTMLImageElement>document.querySelector('.u-avatar-header');
    if (!currentElement) {
        return;
    }

    const parentNode = currentElement.parentElement;
    parentNode.innerHTML = spinner;

    userModel.auth().then((response) => {
        const data = response.json;
        const newAvatar = new IconClass({
            iconClasses: 'avatar u-avatar-header',
            size: 28,
            src: data.photos && data.photos[0] ? data.photos[0] : img
        }).render();

        let newElem = document.createElement('div');
        newElem.innerHTML = newAvatar;
        newElem = <HTMLImageElement>newElem.firstElementChild;
        newElem.onload = () => {
            parentNode.innerHTML = newAvatar;
        };
    });
}
