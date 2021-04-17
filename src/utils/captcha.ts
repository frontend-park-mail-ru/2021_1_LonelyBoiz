import captchaToken from "../consts/captchaToken";

const captcha = (callback: Function): void => {
    grecaptcha.ready(function () {
        grecaptcha
            .execute(captchaToken, { action: 'submit' })
            .then(function (token: string) {
                callback(token);
            });
    });
};

export default captcha;
