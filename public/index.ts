import HomeController from '../src/controllers/HomeController';
import SettingsController from '../src/controllers/SettingsController';
import PreSettingsController from '../src/controllers/PreSettingsController';
import MessageController from '../src/controllers/MessageController';
import LoginController from '../src/controllers/LoginController';
import SignupController from '../src/controllers/SignupController';
import Routes from '../src/consts/routes';
import Router from '../src/utils/router';
import './css/main.css';

const router = new Router();

router.addRoute(Routes.loginRoute, new LoginController());
router.addRoute(Routes.signupRoute, new SignupController());
router.addRoute(Routes.homeRoute, new HomeController());
router.addRoute(Routes.settingsRoute, new SettingsController());
router.addRoute(Routes.preSettingsRoute, new PreSettingsController());
router.addRoute(Routes.messageRoute, new MessageController());

router.start();

window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/sw.js')
            .then((e) => {
                console.log('Service worker register success', e);
            })
            .catch((e) => {
                console.error('Service worker register faillure', e);
            });
    }
});
