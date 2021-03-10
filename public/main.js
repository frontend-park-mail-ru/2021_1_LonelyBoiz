import LoginController from '../src/controllers/LoginController.js'
import SignupController from '../src/controllers/SignupController.js';
import Routes from '../src/consts/routes.js';
import Router from '../src/utils/router.js'

const router = new Router();

const loginController = new LoginController();

router.addRoute(Routes.homeRoute, loginController);
router.addRoute(Routes.loginRoute, loginController);
router.addRoute(Routes.signupRoute, new SignupController());

router.changeRoute(Routes.loginRoute)
