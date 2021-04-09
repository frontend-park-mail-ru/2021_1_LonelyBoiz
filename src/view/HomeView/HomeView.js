import BaseView from '../BaseView.js';
import Views from '../../consts/views.js';

const homeViewTemplate = 'HomeView.hbs';

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
        this.template = Handlebars.templates[homeViewTemplate];
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
