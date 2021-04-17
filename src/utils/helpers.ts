import HttpRequests from './requests';
import backendLocation from '../consts/config';
import eventBus from './eventBus';
import Events from '../consts/events';
import Routes from '../consts/routes';
import feedModel from '../models/FeedModel';
import Context from './Context';
import { IUserModel } from '../models/UserModel';

export interface IResponseData {
    status: number;
    ok: boolean;
    json: Context;
}

export function addIfNotEq(field: Context, condition: Context): Context {
    return field !== condition ? field : undefined;
}

export function filterObject(obj: Context, condition: (value: Context) => boolean): Context {
    const result = {};

    for (const [key, value] of Object.entries(obj)) {
        if (condition(value)) {
            result[key] = value;
        }
    }

    return result;
}

export function parseJson(response: Response): Promise<IResponseData> {
    if (response.status === 204) {
        return Promise.resolve(response);
    }
    return response.json().then((json) => {
        return {
            status: response.status,
            ok: response.ok,
            json
        };
    });
}

export function getAllUsers(response: Response): Promise<IResponseData> {
    if (!response.ok) {
        return Promise.resolve(response);
    }
    if (!response.json) {
        return Promise.resolve({
            status: response.status,
            ok: response.ok,
            json: []
        });
    }
    const userPromises: Promise<IResponseData>[] = [];
    response.json.forEach((uid: number) => {
        userPromises.push(
            HttpRequests.get('/users/' + uid)
                .then(parseJson)
                .then((userResponse) => {
                    userResponse.json.photos = userResponse.json.photos.map(
                        (v: number) => backendLocation + '/images/' + String(v)
                    );
                    return {
                        status: userResponse.status,
                        ok: userResponse.ok,
                        json: userResponse.json
                    };
                })
        );
    });

    return Promise.all(userPromises).then((users) => {
        return {
            status: response.status,
            ok: response.ok,
            json: users
        };
    });
}

export function getFeed(): void {
    feedModel
        .get()
        .then((feedResponse: Response) => {
            if (!feedResponse.ok) {
                eventBus.emit(Events.routeChange, Routes.loginRoute);
                return;
            }

            this.card.setPlaceHolder(false);

            this.userData = feedModel.getCurrent().json;
            if (!this.userData) {
                this.destroyCard();
                this.deleteCard();
                eventBus.emit(Events.pushNotifications, {
                    children:
                        'На этом лента закончилась, но скоро появятся новые пользователи. А пока можете проверить свои вообщения.',
                    duration: 10000
                });
                return;
            }

            this.redrawCard();
        })
        .catch((reason) => {
            console.error('Feed - error: ', reason);
        });
}

export function handleReactionPromise(response: Response): Context {
    if (response.status === 401) {
        eventBus.emit(Events.routeChange, Routes.loginRoute);
    }
    if (response.status === 403) {
        return Promise.reject(new Error('Current user is not part of your feed'));
    }
    if (response.ok) {
        this.userData = feedModel.getCurrent().json;
        if (!this.userData) {
            getFeed.call(this);
            return;
        }

        this.card.setPlaceHolder(false);
        this.redrawCard();
    }
}

export function timeToStringByTime(date: Date): string {
    if (typeof date === 'string') date = new Date(date);
    const timeDiff = (new Date() - date) / 1000;

    if (new Date().getDate() === date.getDate() && timeDiff < 60 * 60 * 24) {
        return date.toLocaleString('ru', {
            hour: '2-digit',
            minute: '2-digit'
        });
    } else if (new Date().getDate() === date.getDate() + 1 && timeDiff < 60 * 60 * 24 * 2) {
        return 'вчера';
    } else {
        const day = date.getDate() + ' ' + date.toLocaleString('ru', { month: 'long' }).slice(0, 3);
        if (new Date().getFullYear() !== date.getFullYear()) {
            return day + ' ' + date.getFullYear();
        }
        return day;
    }
}

export function isActive(data: IUserModel): boolean {
    const requiredFields = ['mail', 'name', 'birthday', 'photos', 'sex', 'datePreference'];

    let activated = true;
    requiredFields.forEach((field) => {
        if (!data[field] || data[field].length === 0) {
            activated = false;
        }
    });

    return activated;
}

export const checkStringEmojis = (str: string): boolean => {
    const regularWord =
        '(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])';
    const reg = new RegExp(regularWord, 'g');
    const match = str.match(reg);
    if (!match) {
        return false;
    }
    return match.join('') === str;
};
