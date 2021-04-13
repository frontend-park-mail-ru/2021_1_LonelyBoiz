import HttpRequests from './requests.js';
import backendLocation from '../consts/config.js';
import eventBus from './eventBus';
import Events from '../consts/events';
import Routes from '../consts/routes';
import feedModel from '../models/FeedModel.js';

export function addIfNotEq(field, condition) {
    return field !== condition ? field : undefined;
}

export function filterObject(obj, condition) {
    const result = {};

    for (const [key, value] of Object.entries(obj)) {
        if (condition(value)) {
            result[key] = value;
        }
    }

    return result;
}

export function parseJson(response) {
    if (response.status === 204) {
        return response;
    }
    return response.json().then(json => {
        return {
            status: response.status,
            ok: response.ok,
            json
        };
    });
}

export function getAllUsers(response) {
    if (!response.ok) {
        return response;
    }
    if (!response.json) {
        return {
            status: response.status,
            ok: response.ok,
            json: []
        };
    }
    const userPromises = [];
    response.json.forEach(uid => {
        userPromises.push(HttpRequests.get('/users/' + uid)
            .then(parseJson)
            .then(userResponse => {
                userResponse.json.photos = userResponse.json.photos.map(v => backendLocation + '/images/' + v);
                return {
                    status: userResponse.status,
                    ok: userResponse.ok,
                    json: userResponse.json
                };
            })
        );
    });

    return Promise.all(userPromises)
        .then(users => {
            return {
                status: response.status,
                ok: response.ok,
                json: users
            };
        });
}

export function getFeed() {
    feedModel.get()
        .then(feedResponse => {
            if (!feedResponse.ok) {
                eventBus.emit(Events.routeChange, Routes.loginRoute);
                return;
            }

            this.card.setPlaceHolder(false);

            this.userData = feedModel.getCurrent().json;
            if (!this.userData) {
                this.showEmptyFeed();
                return;
            }

            this.redrawCard();
        })
        .catch(reason => {
            console.error('Feed - error: ', reason);
        });
}

export function handleReactionPromise(response) {
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
