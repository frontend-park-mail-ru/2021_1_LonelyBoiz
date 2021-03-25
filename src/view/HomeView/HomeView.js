import Header from '../../components/Header/Header.js';
import headerIcons from '../../consts/headerIcons.js';

const homeViewTemplate = 'HomeView.hbs';

/**
 * @class
 * Главная страница
 */
class HomeView {
    /**
     * Создает экземпляр HomeView
     *
     * @constructor
     * @this  {HomeView}
     * @param {Object} context
     */
    constructor(context) {
        this.template = Handlebars.templates[homeViewTemplate];
        this.root = document.getElementById('app');
        this.context = context || {};
    }

    /**
     * Отображает страницу
     */
    show() {
        this.context.Header = new Header({
            activeIcon: headerIcons.home
        }).render();

        this.root.innerHTML = this.template(this.context);
    }
}

export default HomeView;
