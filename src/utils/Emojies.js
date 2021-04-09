import PopoutWrapperClass from './PopoutWrapper.js';
import ScreenSpinner from '../components/ScreenSpinner/ScreenSpinner.js';
import Emojies from '../components/Emojies/Emojies.js';
import IconClass from '../components/Icon/Icon.js';
import EmojiesList from '../consts/emojies.js';

/**
 * @class
 * EmojiesClass
 */
class EmojiesClass extends PopoutWrapperClass {
    /**
     * Создает экземпляр всплывающего окна со смайликами
     *
     * @constructor
     * @this  {EmojiesClass}
     * @callback callback
     */
    constructor(callback) {
        const icons = Object.entries(EmojiesList).map((item, i) => {
            return { iconCode: item[1], idDiv: i, key: item[0] };
        });

        let iconsElems = [[], []];
        icons.forEach((item, i) => {
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
                listener: (e) => {
                    console.log(item.key);
                    callback(item.key);
                    this.destroy();
                }
            });
        });
    }
}

export default EmojiesClass;
