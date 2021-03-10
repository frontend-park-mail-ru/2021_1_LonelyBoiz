import Header from '../../components/Header/Header.js';

const homeViewTemplate = 'HomeView.hbs';

/**
 * @class
 * Страница логина
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
        this.context.Header = new Header().render();
        this.root.innerHTML = this.template(this.context);
    }
}

export default HomeView;
