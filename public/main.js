import HomeController from '../src/controllers/HomeController.js';
import SettingsController from '../src/controllers/SettingsController.js';
import MessageController from '../src/controllers/MessageController.js';
import LoginController from '../src/controllers/LoginController.js';
import SignupController from '../src/controllers/SignupController.js';
import Routes from '../src/consts/routes.js';
import Router from '../src/utils/router.js';
import Notifications from '../src/utils/Notifications.js';
import ScreenSpinnerClass from '../src/utils/ScreenSpinner.js';

import { getAuth } from '../src/models/AuthModel.js';

const notifications = Notifications;

const router = new Router();

router.addRoute(Routes.loginRoute, new LoginController());
router.addRoute(Routes.signupRoute, new SignupController());
router.addRoute(Routes.homeRoute, new HomeController());
router.addRoute(Routes.settingsRoute, new SettingsController());
router.addRoute(Routes.messageRoute, new MessageController());

const popout = new ScreenSpinnerClass({});
getAuth()
    .finally(() => {
        popout.destroy();
    })
    .then((response) => {
        console.log('Response: ', response, response.json);
        if (response.ok) {
            return response.json();
        } else {
            window.localStorage.removeItem('u-id');
            window.localStorage.setItem('u-avatar', 'img/img.png');
        }
    })
    .then((json) => {
        window.localStorage.setItem('u-id', json.id);
        window.localStorage.setItem(
            'u-avatar',
            json.avatar === '' ? 'img/img.png' : json.avatar
        );
    })
    .then((_) => {
        try {
            router.start();
        } catch (error) {
            console.error(error)
        }
    })
    .catch((error) => {
        window.localStorage.removeItem('u-id');
        window.localStorage.setItem('u-avatar', 'img/img.png');
        console.error('Auth error: ', error);
        router.start();
    });
