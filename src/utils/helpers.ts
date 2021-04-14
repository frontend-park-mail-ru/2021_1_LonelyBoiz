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

export function filterObject(
    obj: Context,
    condition: (value: Context) => boolean
): Context {
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
        return Promise.reject(
            new Error('Current user is not part of your feed')
        );
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
    } else if (
        new Date().getDate() === date.getDate() + 1 &&
        timeDiff < 60 * 60 * 24 * 2
    ) {
        return 'вчера';
    } else {
        const day =
            date.getDate() +
            ' ' +
            date.toLocaleString('ru', { month: 'long' }).slice(0, 3);
        if (new Date().getFullYear() !== date.getFullYear()) {
            return day + ' ' + date.getFullYear();
        }
        return day;
    }
}

export function isActive(data: IUserModel): boolean {
    const requiredFields = [
        'mail',
        'name',
        'birthday',
        'photos',
        'sex',
        'datePreferences'
    ];

    let activated = true;
    requiredFields.forEach((field) => {
        if (!data[field] || data[field].length === 0) {
            activated = false;
        }
    });

    return activated;
}
