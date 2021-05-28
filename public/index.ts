import HomeController from '../src/controllers/HomeController';
import SettingsController from '../src/controllers/SettingsController';
import PreSettingsController from '../src/controllers/PreSettingsController';
import MessageController from '../src/controllers/MessageController';
import LoginController from '../src/controllers/LoginController';
import SignupController from '../src/controllers/SignupController';
import Routes from '../src/consts/routes';
import Router from '../src/utils/router';
import Notifications from '../src/utils/Notifications';
import './css/index.scss';
import initSW from '../src/utils/initSW';
import faviconImg from '@img/favicon.png';
initSW();

const push = Notifications;

const router = new Router();

router.addRoute(Routes.loginRoute, new LoginController());
router.addRoute(Routes.signupRoute, new SignupController());
router.addRoute(Routes.homeRoute, new HomeController());
router.addRoute(Routes.settingsRoute, new SettingsController());
router.addRoute(Routes.preSettingsRoute, new PreSettingsController());
router.addRoute(Routes.messageRoute, new MessageController());

router.start();

const favicon = document.createElement('link');
favicon.setAttribute('rel', 'shortcut icon');
favicon.setAttribute('href', faviconImg);
favicon.setAttribute('type', 'image/png');
document.querySelector('head').appendChild(favicon);
