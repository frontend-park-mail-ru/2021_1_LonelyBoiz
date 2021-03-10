const Errors = {
    mail: 'Некорректная почта',
    name: 'Имя должно состоять только из букв',
    birthday: 'Регистрация доступна только совершеннолетним',
    password:
        'Пароль должен:\nБыть  написан на латинице\n' +
        'Использовать как минимум 1 заглавную букву\n' +
        'Использовать как минимум 1 цифру\n',
    passwordRepeat: 'Пароли не совпадают',
    passwordOld: 'Неправльный пароль',
};

export default Errors;