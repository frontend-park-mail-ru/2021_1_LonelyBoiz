import Component from '../Component';
import InfoRow from '../InfoRow/InfoRow';
import Tabbar from '../Tabbar/Tabbar';
import { IconsSrc } from '../../consts/icons';
import { HomeIconsDescription, HomeIconsSrc } from '../../consts/homeCommands';
import template from './InfoBlock.hbs';
import './InfoBlock.scss';
import IconClass from '../Icon/Icon';

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
            city: {
                icon: new IconClass({ iconCode: IconsSrc.home_small_stroke, size: 16 }).render(),
                text: 'Живет в: '
            },
            geo: { icon: new IconClass({ iconCode: IconsSrc.geo_stroke, size: 16 }).render(), text: '' },
            instagram: {
                icon: new IconClass({ iconCode: IconsSrc.instagram_stroke, size: 16 }).render(),
                text: '@'
            }
        };

        this.context.InfoRows = [];
        Object.entries(this.context.info).forEach((item) => {
            const [key, value] = item as [keyof typeof infoRowsType, string];
            infoRowsType[key].text += value;
            this.context.InfoRows.push(new InfoRow(infoRowsType[key]).render());
        });
        if (this.context.description) {
            this.context.Description = new InfoRow({
                text: this.context.description
            }).render();
        }

        if (this.context.buttons && Object.entries(this.context.buttons).length > 0) {
            this.context.Tabbar = new Tabbar({
                icons: Object.entries(this.context.buttons).map((item) => {
                    const [key, value] = item as [keyof typeof HomeIconsSrc, string];
                    return {
                        icon: {
                            size: 24,
                            iconCode: HomeIconsSrc[key],
                            idDiv: `home-commands__${key}`,
                            iconClasses: `${value}-icon ${
                                value === 'active' ? ' info-block__commands-icon_cursor ' : ''
                            }`,
                            useTooltip: true,
                            text: HomeIconsDescription[key],
                            direction: 'bottom',
                            arrow: true
                        }
                    };
                })
            }).render();
        }

        return this.template(this.context);
    }
}

export default InfoBlock;
