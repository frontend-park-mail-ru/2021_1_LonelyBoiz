import HomeController from '../src/controllers/HomeController.js';
import SettingsController from '../src/controllers/SettingsController.js';
import MessageController from '../src/controllers/MessageController.js';
import LoginController from '../src/controllers/LoginController.js';
import SignupController from '../src/controllers/SignupController.js';
import Routes from '../src/consts/routes.js';
import Router from '../src/utils/router.js';

const router = new Router();

router.addRoute(Routes.loginRoute, new LoginController());
router.addRoute(Routes.signupRoute, new SignupController());
router.addRoute(Routes.homeRoute, new HomeController());
router.addRoute(Routes.settingsRoute, new SettingsController());
router.addRoute(Routes.messageRoute, new MessageController());

router.start()
