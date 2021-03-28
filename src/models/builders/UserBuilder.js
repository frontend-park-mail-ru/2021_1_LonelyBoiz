import UserModel from "../UserModel";

class UserBuilder {
    constructor(){
        this._id = -1
        this._mail = ''
        this._name = ''
        this._birthday = 0
        this._description = ''
        this._city = ''
        this._avatar = ''
        this._instagram = ''
        this._sex = ''
        this._datePreference = ''
    }

    id(id) {
        this._id = id;
        return this;
    }

    mail(mail) {
        this._mail = mail;
        return this;
    }

    name(name) {
        this._name = name;
        return this;
    }

    birthday(day) {
        this._birthday = day
        return this;
    }

    description(description) {
        this._description = description
        return this;
    }

    city(city) {
        this._city = city;
        return this;
    }

    avatar(avatar) {
        this._avatar = avatar;
        return this;
    }

    instagram(instagram) {
        this._instagram = instagram;
        return this;
    }

    sex(sex) {
        this._sex = sex
        return this;
    };

    datePreference(datePreference) {
        this._datePreference = datePreference;
        return this;
    }

    build() {
        return new UserModel(this)
    }
}

export default UserBuilder
