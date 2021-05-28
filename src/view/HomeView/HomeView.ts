import BaseView from '../BaseView';
import Views from '../../consts/views';
import template from './HomeView.hbs';
import Context from '../../utils/Context';
import './HomeView.scss';
import Placeholder from '../../components/Placeholder/Placeholder';
import { IconsSrc } from '../../consts/icons';

/**
 * @class
 * Главная страница
 */
class HomeView extends BaseView {
    /**
     * Создает экземпляр HomeView
     *
     * @constructor
     * @this  {HomeView}
     * @param {Context} context
     */
    constructor(context?: Context) {
        super({ view: Views.Home, template, context });
    }

    /**
     * Отображает страницу
     */
    show(): void {
        super.show();
        this.context.placeholder = new Placeholder({
            iconCode: IconsSrc.message_outline,
            title: 'Лента пока закончилась',
            subtitle: 'Можете проверить свои сообщения'
        }).render();
        this.root.innerHTML = this.template(this.context);
    }
}

export default HomeView;
