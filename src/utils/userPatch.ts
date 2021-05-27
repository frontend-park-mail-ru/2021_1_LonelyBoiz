import userModel from '../models/UserModel';
import eventBus from './eventBus';
import Events from '../consts/events';
import { processingResultForms } from './form';
import Context from './Context';
import ScreenSpinnerClass from './ScreenSpinner';

export function patchUser(tmpForm: Context): Promise<Response> {
    const popout = new ScreenSpinnerClass();

    return userModel
        .update(tmpForm)
        .finally(() => {
            popout.destroy();
        })
        .then((response) => {
            const json = response.json;
            eventBus.emit(Events.pushNotifications, { children: 'Сохранено' });
            eventBus.emit(Events.resetFeed);
            processingResultForms({
                data: json || {},
                errorBlockId: 'settings-error',
                formList: this.settingsList
            });
            return response;
        })
        .catch((reason) => {
            console.error(reason);
            eventBus.emit(Events.pushNotifications, {
                status: 'error',
                children: 'Что-то не то с интернетом('
            });
            return null;
        });
}
