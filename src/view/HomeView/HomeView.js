import BaseView from '../BaseView.js';
import Views from '../../consts/views.js';
import template from './HomeView.hbs';

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
     * @param {Object} context
     */
    constructor(context) {
        super(Views.Home);
        this.template = template;
        this.context = context || {};
    }

    /**
     * Отображает страницу
     */
    show() {
        super.show();
        this.root.innerHTML = this.template(this.context);
    }
}

export default HomeView;
