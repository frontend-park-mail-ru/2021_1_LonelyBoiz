import InfoRow from '../InfoRow/InfoRow.js';
import Tabbar from '../Tabbar/Tabbar.js';
import { Icons } from '../../consts/icons.js';
import { HomeIconsSrc } from '../../consts/homeCommands.js';

/**
 * @class
 * Компонента InfoBlock
 */
class InfoBlock {
    /**
     * Создает экземпляр InfoBlock
     *
     * @constructor
     * @this  {InfoBlock}
     * @param {{avatar, title, messageIconInTitle, info:{city, geo, instagram}, description, buttons:{like:'active'|'disable', dislike:'active'|'disable', return:'active'|'disable'}, borderRadiusBottom, borderRadiusRight}} context
     */
    constructor(context) {
        this.template = Handlebars.templates['InfoBlock.hbs'];
        this.context = context;
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render() {
        const infoRowsType = {
            city: { iconSrc: Icons.home_small_stroke, text: 'Живет в: ' },
            geo: { iconSrc: Icons.geo_stroke, text: '' },
            instagram: { iconSrc: Icons.instagram_stroke, text: '@' }
        };

        this.context.InfoRows = [];
        for (const [key, value] of Object.entries(this.context.info)) {
            infoRowsType[key].text += value;
            this.context.InfoRows.push(new InfoRow(infoRowsType[key]).render());
        }
        if (this.context.description) {
            this.context.Description = new InfoRow({
                text: this.context.description
            }).render();
        }

        if (this.context.buttons && Object.entries(this.context.buttons).length > 0) {
            this.context.Tabbar = new Tabbar({
                icons: Object.entries(this.context.buttons).map((item) => {
                    const [key, value] = item;
                    return {
                        size: 24,
                        iconCode: HomeIconsSrc[key],
                        idDiv: `home-commands__${key}`,
                        iconClasses: `${value}-icon ${value === 'active' ? 'info-block__commands-icon_cursor' : ''}`
                    };
                })
            }).render();
        }

        this.context.Tabbar1 = new Tabbar({
            icons: [{ iconClasses: 'avatar', size: 28, src: 'img/logo.png' }]
        }).render();

        return this.template(this.context);
    }
}

export default InfoBlock;
