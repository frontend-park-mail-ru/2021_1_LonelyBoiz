import PopoutWrapperClass from './PopoutWrapper';
import Emojis from '../components/Emojis/Emojis';
import IconClass from '../components/Icon/Icon';
import EmojisList from '../consts/emojis';

/**
 * @class
 * EmojisPopup
 */
class EmojisPopup extends PopoutWrapperClass {
    /**
     * Создает экземпляр всплывающего окна со смайликами
     *
     * @constructor
     * @this  {EmojisPopup}
     * @callback callback
     */
    constructor(callback: Function) {
        const icons = EmojisList.map((item, i) => {
            return { iconCode: item, idDiv: String(i), key: i };
        });

        const iconsElems = new Array(Math.ceil(icons.length / 3));
        icons.forEach((item, i) => {
            if (!iconsElems[Math.trunc(i / 3)]) {
                iconsElems[Math.trunc(i / 3)] = [];
            }
            iconsElems[Math.trunc(i / 3)][i % 3] = new IconClass(item).render();
        });

        super({
            children: new Emojis({
                emojis: iconsElems
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

export default EmojisPopup;
