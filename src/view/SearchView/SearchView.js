import Input from '../../components/Input/Input.js';
import FormList from '../../components/FormList/FormList.js';
import Header from '../../components/Header/Header.js';

const searchViewTemplate = 'SearchView.hbs';

/**
 * @class
 * Страница логина
 */
class SearchView {
    /**
     * Создает экземпляр searchView
     *
     * @constructor
     * @this  {SearchView}
     * @param {Object} context
     */
    constructor(context) {
        this.template = Handlebars.templates[searchViewTemplate];
        this.root = document.getElementById('app');
        this.context = context || {};
    }

    /**
     * Отображает страницу
     */
    show() {
        this.context.Header = new Header().render();
        this.context.SearchFilter = new FormList({
            id: 'filter__form',
            formList: [
                {
                    top: 'Имя',
                    children: new Input({
                        id:"test1",
                        placeholder: 'Имя'
                    }).render()
                },
                {
                    top: 'Возраст',
                    children: new Input({
                        minValue: 18,
                        defaultValue: 18,
                        type: 'number',
                        placeholder: 'Возраст'
                    }).render()
                }
            ]
        }).render();

        this.root.innerHTML = this.template(this.context);
    }
}

export default SearchView;
