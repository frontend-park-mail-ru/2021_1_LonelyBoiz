import SearchController from '../src/controllers/SearchController.js';
import HomeController from '../src/controllers/HomeController.js';
import SettingsController from '../src/controllers/SettingsController.js';
import MessageController from '../src/controllers/MessageController.js';

import LoginController from '../src/controllers/LoginController.js';
import SignupController from '../src/controllers/SignupController.js';
import Routes from '../src/consts/routes.js';
import Router from '../src/utils/router.js';

import { getAuth } from '../src/models/AuthModel.js';

const router = new Router();

router.addRoute(Routes.homeRoute, new HomeController());
router.addRoute(Routes.settingsRoute, new SettingsController());
router.addRoute(Routes.messageRoute, new MessageController());
router.addRoute(Routes.searchRoute, new SearchController());
router.addRoute(Routes.loginRoute, new LoginController());
router.addRoute(Routes.signupRoute, new SignupController());

getAuth()
    .then((response) => {
        console.log('Response: ', response, response.json);
        if (response.ok) {
            return response.json();
        } else {
            window.localStorage.removeItem('u-id');
            window.localStorage.setItem('u-avatar', 'img/img.png');
            router.changeRoute(Routes.loginRoute);
        }
    })
    .then((json) => {
        window.localStorage.setItem('u-id', json.id);
        window.localStorage.setItem('u-avatar', json.avatar);
        router.changeRoute(Routes.homeRoute);
    })
    .catch((error) => {
        window.localStorage.removeItem('u-id');
        window.localStorage.setItem('u-avatar', 'img/img.png');
        console.error('Auth error: ', error);
        router.changeRoute(Routes.loginRoute);
    });
