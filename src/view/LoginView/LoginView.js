const loginViewTemplate = 'LoginView.hbs';

/**
 * @class
 * Страница логина
 */
class LoginView {
    /**
     * Создает экземпляр LoginView
     *
     * @constructor
     * @this  {LoginView}
     */
    constructor() {
        this.template = Handlebars.templates[loginViewTemplate];
    }

    /**
     * Отображает страницу логина
     * @param {Object} context - форма с полями ввода и кнопкой
     */
    render(context) {
        return this.template(context);
    }
}

export default LoginView;
