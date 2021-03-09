const signupViewTemplate = 'SignupView.hbs';

/**
 * @class
 * Страница логина
 */
class SignupView {
    /**
     * Создает экземпляр signupView
     *
     * @constructor
     * @this  {SignupView}
     */
    constructor() {
        this.template = Handlebars.templates[signupViewTemplate];
    }

    /**
     * Отображает страницу регистрации
     * @param {Object} context - форма с полями ввода и кнопкой
     *
     */
    render(context) {
        return this.template(context);
    }
}

export default SignupView;
