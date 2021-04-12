import PopoutWrapperClass from './PopoutWrapper';
import Emojies from '../components/Emojies/Emojies';
import IconClass from '../components/Icon/Icon';
import EmojiesList from '../consts/emojies';

/**
 * @class
 * EmojiesPopup
 */
class EmojiesPopup extends PopoutWrapperClass {
    /**
     * Создает экземпляр всплывающего окна со смайликами
     *
     * @constructor
     * @this  {EmojiesPopup}
     * @callback callback
     */
    constructor(callback: Function) {
        const icons = Object.entries(EmojiesList).map((item, i) => {
            return { iconCode: item[1], idDiv: String(i), key: item[0] };
        });

        const iconsElems = new Array(Math.ceil(icons.length / 3));
        icons.forEach((item, i) => {
            if (!iconsElems[Math.trunc(i / 3)]) {
                iconsElems[Math.trunc(i / 3)] = [];
            }
            iconsElems[Math.trunc(i / 3)][i % 3] = new IconClass(item).render();
        });

        super({
            children: new Emojies({
                emojies: iconsElems
            }).render(),
            block: false,
            showBg: true
        });

        icons.forEach((item) => {
            this.registerListener({
                element: document.getElementById(String(item.idDiv)),
                type: 'click',
                listener: () => {
                    console.log(item.key);
                    callback(item.key);
                    this.destroy();
                }
            });
        });
    }
}

export default EmojiesPopup;
