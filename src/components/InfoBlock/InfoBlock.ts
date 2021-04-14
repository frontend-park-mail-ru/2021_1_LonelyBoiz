import Component from '../Component';
import InfoRow from '../InfoRow/InfoRow';
import Tabbar from '../Tabbar/Tabbar';
import { Icons } from '../../consts/icons';
import { HomeIconsSrc } from '../../consts/homeCommands';
import template from './InfoBlock.hbs';
import './InfoBlock.scss';

type ButtonsState = 'active' | 'disable';

export interface IButtons {
    like?: ButtonsState;
    dislike?: ButtonsState;
    return?: ButtonsState;
}

interface IInfoBlock {
    avatar?: string;
    title?: string;
    messageIconInTitle?: string;
    info: { city?: string; geo?: string; instagram?: string };
    description?: string;
    buttons?: IButtons;
    borderRadiusBottom?: boolean;
    borderRadiusRight?: boolean;
}

/**
 * @class
 * Компонента InfoBlock
 */
class InfoBlock extends Component {
    /**
     * Создает экземпляр InfoBlock
     *
     * @constructor
     * @this  {InfoBlock}
     * @param {IInfoBlock} context
     */
    constructor(context?: IInfoBlock) {
        super(context, template);
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render(): string {
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

        if (
            this.context.buttons &&
            Object.entries(this.context.buttons).length > 0
        ) {
            this.context.Tabbar = new Tabbar({
                icons: Object.entries(this.context.buttons).map((item) => {
                    const [key, value] = item;
                    return {
                        icon: {
                            size: 24,
                            iconCode: HomeIconsSrc[key],
                            idDiv: `home-commands__${key}`,
                            iconClasses: `${value}-icon ${
                                value === 'active'
                                    ? 'info-block__commands-icon_cursor'
                                    : ''
                            }`
                        }
                    };
                })
            }).render();
        }

        return this.template(this.context);
    }
}

export default InfoBlock;
