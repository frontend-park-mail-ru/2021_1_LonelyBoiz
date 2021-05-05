import { successURLLocation, receiverWallet } from '../../consts/pay';
import UserModel from '../../models/UserModel';
import Button from '../Button/Button';
import Component from '../Component';
import FormItem from '../FormItem/FormItem';
import Select from '../Select/Select';
import template from './Pay.hbs';

/**
 * @class
 * Компонента Pay
 */
class Pay extends Component {
    /**
     * Создает экземпляр Pay
     *
     * @constructor
     * @this  {Pay}
     * @param {IPayItem} context
     */
    constructor() {
        super(null, template);
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render(): string {
        this.context.select = new FormItem({
            top: 'Количество лайков',
            children: new Select({
                options: [
                    {
                        title: '40 лайков',
                        value: '3'
                    },
                    {
                        title: '20 лайков',
                        value: '2'
                    },
                    {
                        title: '10 лайков',
                        value: '1'
                    }
                ],
                name: 'sum',
                dataType: 'number'
            }).render()
        }).render();

        this.context.payMethods = new FormItem({
            top: 'Способ оплаты',
            children: new Select({
                options: [
                    {
                        title: 'ЮMoney',
                        value: 'PC'
                    },
                    {
                        title: 'Банковской картой',
                        value: 'AC'
                    },
                    {
                        title: 'Мобильным телефоном',
                        value: 'MC'
                    }
                ],
                name: 'paymentType'
            }).render()
        }).render();

        this.context.submit = new FormItem({
            children: new Button({
                type: 'submit',
                text: 'Оплатить'
            }).render()
        }).render();

        this.context.successURLLocation = successURLLocation;
        this.context.receiverWallet = receiverWallet;
        this.context.label = JSON.stringify({ userId: UserModel.getData().id });

        return this.template(this.context);
    }
}

export default Pay;
